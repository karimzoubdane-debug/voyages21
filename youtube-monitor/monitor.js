#!/usr/bin/env node
/**
 * YouTube Channel Monitor — Voyages21
 * Génère un Kanban HTML interactif + message WhatsApp
 * Fréquence : tous les 2 jours (GitHub Actions cron)
 */

'use strict';
const https = require('https');
const fs    = require('fs');
const path  = require('path');

const DIR        = __dirname;
const CONFIG     = JSON.parse(fs.readFileSync(path.join(DIR, 'channels.json'), 'utf8'));
const STATE_FILE = path.join(DIR, 'last-check.json');
const OUTPUT_DIR = path.join(DIR, 'output');
const IDS_CACHE  = path.join(DIR, 'resolved-ids.json');

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// ─── HTTP helper ────────────────────────────────────────────────────────────

function get(url, maxRedirects = 3) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, {
      timeout: 15000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; YTMonitor/1.0)',
        'Accept-Language': 'fr-FR,fr;q=0.9,en;q=0.8'
      }
    }, res => {
      if ([301, 302, 307, 308].includes(res.statusCode) && res.headers.location && maxRedirects > 0) {
        return get(res.headers.location, maxRedirects - 1).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error(`Timeout: ${url}`)); });
  });
}

// ─── Channel ID resolver (handle → UC...) ───────────────────────────────────

async function resolveChannelId(handle) {
  const idsCache = loadIdsCache();
  if (idsCache[handle]) return idsCache[handle];

  const urls = [
    `https://www.youtube.com/@${handle}`,
    `https://www.youtube.com/c/${handle}`,
    `https://www.youtube.com/user/${handle}`
  ];

  for (const url of urls) {
    try {
      const html = await get(url);
      const m = html.match(/"channelId":"(UC[a-zA-Z0-9_-]{22})"/);
      if (m) {
        idsCache[handle] = m[1];
        saveIdsCache(idsCache);
        console.log(`  ✓ ID résolu pour @${handle} → ${m[1]}`);
        return m[1];
      }
    } catch (e) {
      // try next url
    }
  }
  console.warn(`  ⚠ Impossible de résoudre l'ID pour @${handle}`);
  return null;
}

function loadIdsCache() {
  try { return JSON.parse(fs.readFileSync(IDS_CACHE, 'utf8')); } catch { return {}; }
}
function saveIdsCache(data) {
  fs.writeFileSync(IDS_CACHE, JSON.stringify(data, null, 2));
}

// ─── RSS parser ──────────────────────────────────────────────────────────────

function parseRSS(xml) {
  const entries = [];
  const re = /<entry>([\s\S]*?)<\/entry>/g;
  let m;
  while ((m = re.exec(xml)) !== null) {
    const e = m[1];
    const g = tag => {
      const r = e.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`));
      return r ? r[1].replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&#39;/g,"'").replace(/&quot;/g,'"').trim() : '';
    };
    const videoId  = g('yt:videoId');
    const title    = g('title');
    const published = g('published');
    const views    = (e.match(/media:statistics\s+views="(\d+)"/) || [])[1] || '0';
    const thumb    = (e.match(/url="(https:\/\/i\.ytimg\.com[^"]+)"/) || [])[1] || '';
    const desc     = g('media:description').slice(0, 160);
    if (videoId && title) {
      entries.push({
        videoId,
        title,
        published,
        url: `https://www.youtube.com/watch?v=${videoId}`,
        views: parseInt(views, 10),
        thumbnail: thumb,
        description: desc
      });
    }
  }
  return entries;
}

// ─── Date helpers ─────────────────────────────────────────────────────────────

function relativeDate(dateStr) {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const h = Math.floor(diffMs / 3600000);
  const d = Math.floor(diffMs / 86400000);
  if (h < 1)  return 'il y a moins d\'1h';
  if (h < 24) return `il y a ${h}h`;
  if (d === 1) return 'il y a 1 jour';
  return `il y a ${d} jours`;
}

function isNew(dateStr, thresholdHours = 48) {
  return (Date.now() - new Date(dateStr).getTime()) < thresholdHours * 3600000;
}

function fmtViews(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000)     return Math.round(n / 1_000) + 'k';
  return n.toString();
}

function frDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('fr-FR', { day:'2-digit', month:'2-digit', year:'numeric' });
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const now     = new Date();
  const nowISO  = now.toISOString();
  const dateLabel = now.toLocaleDateString('fr-FR', { weekday:'long', day:'numeric', month:'long', year:'numeric' });
  const dateShort = now.toLocaleDateString('fr-FR', { day:'2-digit', month:'2-digit', year:'numeric' });

  // Load state
  let state = {};
  try { state = JSON.parse(fs.readFileSync(STATE_FILE, 'utf8')); } catch { /* first run */ }

  const results = [];
  const maxVideos = CONFIG.settings?.videos_per_channel || 5;
  const newThreshold = CONFIG.settings?.new_video_threshold_hours || 48;

  for (const ch of CONFIG.channels) {
    process.stdout.write(`📡 ${ch.name} (@${ch.handle})… `);

    let channelId = ch.channel_id || '';
    if (!channelId) channelId = await resolveChannelId(ch.handle) || '';

    let videos = [];
    let status = 'ok';
    let errorMsg = '';

    if (!channelId) {
      status = 'error';
      errorMsg = `ID introuvable pour @${ch.handle}`;
      console.log(`❌ ${errorMsg}`);
    } else {
      try {
        const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
        const xml    = await get(rssUrl);
        videos       = parseXML_safe(xml).slice(0, maxVideos);
        console.log(`✓ ${videos.length} vidéos`);
      } catch (e) {
        status   = 'error';
        errorMsg = e.message;
        console.log(`❌ ${e.message}`);
      }
    }

    const prevLatest = state[ch.id]?.latestVideoId;
    const hasNew     = videos.some(v => isNew(v.published, newThreshold));
    const newCount   = videos.filter(v => isNew(v.published, newThreshold)).length;

    results.push({
      ...ch,
      channelId,
      videos,
      status,
      errorMsg,
      hasNew,
      newCount,
      prevLatest,
      checkedAt: nowISO
    });
  }

  // Save state
  const newState = {};
  for (const r of results) {
    newState[r.id] = {
      name: r.name,
      channelId: r.channelId,
      lastCheck: nowISO,
      latestVideoId: r.videos[0]?.videoId || null
    };
  }
  fs.writeFileSync(STATE_FILE, JSON.stringify(newState, null, 2));

  // Generate outputs
  const totalNew = results.reduce((s, r) => s + r.newCount, 0);
  const kanbanHtml = generateKanban(results, { dateLabel, dateShort, totalNew, nowISO, newThreshold });
  const whatsappTxt = generateWhatsApp(results, { dateLabel, dateShort, totalNew, nowISO, newThreshold });

  const kanbanFile    = path.join(OUTPUT_DIR, 'kanban-latest.html');
  const whatsappFile  = path.join(OUTPUT_DIR, 'whatsapp-latest.txt');
  const kanbanArchive = path.join(OUTPUT_DIR, `kanban-${dateShort.replace(/\//g,'-')}.html`);

  fs.writeFileSync(kanbanFile,    kanbanHtml);
  fs.writeFileSync(whatsappFile,  whatsappTxt);
  fs.writeFileSync(kanbanArchive, kanbanHtml);

  console.log(`\n✅ Terminé — ${totalNew} nouvelle(s) vidéo(s) sur ${results.length} chaînes`);
  console.log(`   📄 ${kanbanFile}`);
  console.log(`   💬 ${whatsappFile}`);
}

// Small wrapper that won't throw
function parseXML_safe(xml) {
  try { return parseRSS(xml); } catch { return []; }
}

// ─── HTML Kanban generator ────────────────────────────────────────────────────

function generateKanban(results, { dateLabel, dateShort, totalNew, nowISO, newThreshold }) {
  const mes3    = results.filter(r => r.group === 'mes-chaines');
  const top5    = results.filter(r => r.group === 'top5-global');
  const checkedAt = new Date(nowISO).toLocaleTimeString('fr-FR', { hour:'2-digit', minute:'2-digit' });

  function videoCard(v, thresholdH) {
    const badge = isNew(v.published, thresholdH)
      ? `<span class="vid-new">🔴 NOUVEAU</span>` : '';
    const viewsStr = v.views > 0 ? `<span class="vid-views">👀 ${fmtViews(v.views)}</span>` : '';
    return `
      <a href="${v.url}" target="_blank" class="vid-row${isNew(v.published, thresholdH) ? ' vid-row-new' : ''}">
        ${badge}
        <span class="vid-title">${escHtml(v.title)}</span>
        <span class="vid-meta">${relativeDate(v.published)} ${viewsStr}</span>
      </a>`;
  }

  function channelCard(r) {
    const statusDot = r.status === 'error'
      ? `<span class="dot dot-err" title="${escHtml(r.errorMsg)}"></span>`
      : r.hasNew
        ? `<span class="dot dot-new"></span>`
        : `<span class="dot dot-ok"></span>`;

    const vidRows = r.videos.length
      ? r.videos.map(v => videoCard(v, newThreshold)).join('')
      : r.status === 'error'
        ? `<div class="vid-error">⚠ ${escHtml(r.errorMsg)}</div>`
        : `<div class="vid-error">Aucune vidéo trouvée</div>`;

    const newBadge = r.newCount > 0
      ? `<span class="badge-new">${r.newCount} new</span>` : '';

    return `
    <div class="ch-card${r.hasNew ? ' ch-card-new' : ''}">
      <div class="ch-head">
        <div class="ch-left">
          ${statusDot}
          <span class="ch-flag">${r.flag}</span>
          <div>
            <div class="ch-name">${escHtml(r.name)}</div>
            <div class="ch-cat">${escHtml(r.category)}</div>
          </div>
        </div>
        <div class="ch-right">
          ${newBadge}
          <a href="https://youtube.com/@${r.handle}" target="_blank" class="ch-link">Chaîne ↗</a>
        </div>
      </div>
      <div class="vid-list">${vidRows}</div>
    </div>`;
  }

  const nextCheckDate = new Date(Date.now() + 2 * 86400000)
    .toLocaleDateString('fr-FR', { weekday:'long', day:'numeric', month:'long' });

  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Veille YouTube — ${dateShort} — Voyages21</title>
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
:root {
  --bg:#0d1117; --bg2:#161b22; --bg3:#1c2333; --bg4:#212842;
  --border:#2a3045; --border2:#3a4560;
  --blue:#2f6fd4; --blue-l:#4a8ae8; --blue-dim:rgba(47,111,212,0.12);
  --silver:#8b9ab5; --text:#e2e8f0; --text-m:#6b7fa3;
  --white:#f8fafc; --green:#22c55e; --orange:#f59e0b; --red:#ef4444;
  --gold:#d4a843; --gold-dim:rgba(212,168,67,0.12);
  --radius:10px;
}
*{margin:0;padding:0;box-sizing:border-box;}
body{font-family:'Sora',sans-serif;background:var(--bg);color:var(--text);min-height:100vh;}

/* ── Header ── */
header{
  background:var(--bg2);border-bottom:1px solid var(--border);
  padding:20px 32px;display:flex;align-items:center;
  justify-content:space-between;flex-wrap:wrap;gap:16px;
  position:sticky;top:0;z-index:50;
}
.logo{font-size:12px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:var(--white);}
.logo span{color:var(--blue-l);}
.header-meta{font-size:11px;color:var(--text-m);}
.header-stats{display:flex;gap:24px;align-items:center;flex-wrap:wrap;}
.hstat{text-align:center;}
.hstat-val{font-size:22px;font-weight:800;color:var(--white);line-height:1;}
.hstat-lbl{font-size:10px;color:var(--text-m);text-transform:uppercase;letter-spacing:1px;margin-top:2px;}
.hstat-val.gold{color:var(--gold);}

/* ── Next check banner ── */
.next-banner{
  margin:16px 32px 0;padding:10px 16px;
  background:var(--blue-dim);border:1px solid var(--border2);border-radius:8px;
  font-size:11px;color:var(--silver);display:flex;align-items:center;gap:8px;
}

/* ── Section ── */
.main{padding:24px 32px;}
.section-block{margin-bottom:40px;}
.section-label{
  font-size:10px;font-weight:700;letter-spacing:2.5px;
  text-transform:uppercase;color:var(--text-m);
  padding:0 0 12px 2px;border-bottom:1px solid var(--border);margin-bottom:20px;
  display:flex;align-items:center;gap:10px;
}
.section-count{
  background:var(--bg3);border:1px solid var(--border);border-radius:12px;
  padding:2px 9px;font-size:10px;color:var(--silver);letter-spacing:0;
}

/* ── Channel grid ── */
.ch-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(360px,1fr));gap:16px;}

/* ── Channel card ── */
.ch-card{
  background:var(--bg2);border:1px solid var(--border);border-radius:var(--radius);
  padding:18px;display:flex;flex-direction:column;gap:14px;
  transition:all 0.2s;
}
.ch-card:hover{border-color:var(--border2);transform:translateY(-2px);box-shadow:0 8px 28px rgba(0,0,0,0.3);}
.ch-card-new{border-color:rgba(212,168,67,0.35);}
.ch-card-new:hover{border-color:var(--gold);}

.ch-head{display:flex;align-items:flex-start;justify-content:space-between;gap:10px;}
.ch-left{display:flex;align-items:center;gap:10px;}
.ch-right{display:flex;align-items:center;gap:8px;flex-shrink:0;}
.ch-flag{font-size:18px;line-height:1;}
.ch-name{font-size:13px;font-weight:700;color:var(--white);line-height:1.3;}
.ch-cat{font-size:10px;color:var(--text-m);margin-top:3px;}
.ch-link{font-size:10px;color:var(--blue-l);font-weight:600;text-decoration:none;}
.ch-link:hover{text-decoration:underline;}

.badge-new{
  background:var(--gold-dim);border:1px solid rgba(212,168,67,0.4);
  color:var(--gold);font-size:10px;font-weight:700;
  padding:2px 8px;border-radius:10px;letter-spacing:0.5px;
}

/* ── Status dots ── */
.dot{width:7px;height:7px;border-radius:50%;flex-shrink:0;}
.dot-ok{background:var(--green);box-shadow:0 0 6px var(--green);}
.dot-new{background:var(--gold);box-shadow:0 0 8px var(--gold);animation:pulse 1.5s infinite;}
.dot-err{background:var(--orange);}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}

/* ── Video list ── */
.vid-list{display:flex;flex-direction:column;gap:6px;}
.vid-row{
  display:flex;flex-direction:column;gap:3px;
  padding:9px 11px;border-radius:7px;
  background:var(--bg3);border:1px solid var(--border);
  text-decoration:none;transition:all 0.15s;
}
.vid-row:hover{border-color:var(--border2);background:var(--bg4);}
.vid-row-new{border-color:rgba(212,168,67,0.25);background:rgba(212,168,67,0.04);}
.vid-row-new:hover{border-color:rgba(212,168,67,0.5);}

.vid-new{font-size:9px;font-weight:700;color:var(--gold);letter-spacing:0.5px;margin-bottom:2px;}
.vid-title{font-size:12px;color:var(--text);line-height:1.35;font-weight:500;}
.vid-meta{font-size:10px;color:var(--text-m);display:flex;align-items:center;gap:8px;margin-top:2px;}
.vid-views{color:var(--silver);}
.vid-error{font-size:11px;color:var(--orange);padding:8px;background:rgba(245,158,11,0.06);border-radius:6px;border:1px solid rgba(245,158,11,0.2);}

/* ── Footer ── */
footer{
  text-align:center;padding:24px 32px;
  font-size:10px;color:var(--text-m);border-top:1px solid var(--border);
  margin-top:20px;
}

/* ── Filter bar ── */
.filter-bar{
  padding:12px 32px;display:flex;gap:8px;align-items:center;flex-wrap:wrap;
  border-bottom:1px solid var(--border);background:var(--bg2);
}
.chip{
  background:transparent;border:1px solid var(--border);color:var(--text-m);
  padding:5px 14px;border-radius:20px;font-size:10px;font-family:'Sora',sans-serif;
  font-weight:600;cursor:pointer;text-transform:uppercase;letter-spacing:0.5px;
  transition:all 0.15s;
}
.chip:hover,.chip.active{background:var(--blue-dim);border-color:var(--blue);color:var(--blue-l);}
.chip.gold:hover,.chip.gold.active{background:var(--gold-dim);border-color:var(--gold);color:var(--gold);}

@media(max-width:640px){
  header,main,.filter-bar{padding-left:16px;padding-right:16px;}
  .ch-grid{grid-template-columns:1fr;}
  .next-banner{margin:12px 16px 0;}
}
</style>
</head>
<body>

<header>
  <div>
    <div class="logo">VOYAGES<span>21</span> · Veille YouTube</div>
    <div class="header-meta">📅 ${dateLabel}</div>
  </div>
  <div class="header-stats">
    <div class="hstat">
      <div class="hstat-val">${results.length}</div>
      <div class="hstat-lbl">Chaînes</div>
    </div>
    <div class="hstat">
      <div class="hstat-val gold">${totalNew}</div>
      <div class="hstat-lbl">Nouvelles vidéos</div>
    </div>
    <div class="hstat">
      <div class="hstat-val">${results.filter(r => r.status === 'ok').length}</div>
      <div class="hstat-lbl">Actives</div>
    </div>
    <div class="hstat">
      <div class="hstat-val">${checkedAt}</div>
      <div class="hstat-lbl">Mis à jour</div>
    </div>
  </div>
</header>

<div class="next-banner">
  ⏰ Prochaine veille automatique : <strong>${nextCheckDate} à 00:00</strong> — Livrable disponible à 11h00
</div>

<div class="filter-bar">
  <button class="chip active" onclick="filterGroup('all')">Toutes (${results.length})</button>
  <button class="chip gold" onclick="filterGroup('new')">Nouvelles uniquement (${totalNew})</button>
  <button class="chip" onclick="filterGroup('mes-chaines')">Mes 3 chaînes (${mes3.length})</button>
  <button class="chip" onclick="filterGroup('top5-global')">Top 5 Mondial (${top5.length})</button>
</div>

<div class="main">

  <div class="section-block" id="sec-mes-chaines">
    <div class="section-label">
      🇫🇷 Mes 3 Chaînes
      <span class="section-count">${mes3.length} chaînes · ${mes3.reduce((s,r)=>s+r.newCount,0)} nouvelles vidéos</span>
    </div>
    <div class="ch-grid">
      ${mes3.map(channelCard).join('\n')}
    </div>
  </div>

  <div class="section-block" id="sec-top5-global">
    <div class="section-label">
      🌍 Top 5 Mondial — IA · Business · Marketing
      <span class="section-count">${top5.length} chaînes · ${top5.reduce((s,r)=>s+r.newCount,0)} nouvelles vidéos</span>
    </div>
    <div class="ch-grid">
      ${top5.map(channelCard).join('\n')}
    </div>
  </div>

</div>

<footer>
  Généré automatiquement le ${dateLabel} à ${checkedAt} · Voyages21 YouTube Monitor
  · Prochaine vérification dans 2 jours
</footer>

<script>
function filterGroup(group) {
  document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
  event.target.classList.add('active');

  const cards = document.querySelectorAll('.ch-card');
  const secMes  = document.getElementById('sec-mes-chaines');
  const secTop5 = document.getElementById('sec-top5-global');

  if (group === 'all') {
    secMes.style.display = secTop5.style.display = '';
    cards.forEach(c => c.style.display = '');
  } else if (group === 'new') {
    secMes.style.display = secTop5.style.display = '';
    cards.forEach(c => {
      c.style.display = c.classList.contains('ch-card-new') ? '' : 'none';
    });
  } else if (group === 'mes-chaines') {
    secMes.style.display = '';
    secTop5.style.display = 'none';
    cards.forEach(c => c.style.display = '');
  } else if (group === 'top5-global') {
    secMes.style.display = 'none';
    secTop5.style.display = '';
    cards.forEach(c => c.style.display = '');
  }
}
</script>
</body>
</html>`;
}

// ─── WhatsApp message generator ───────────────────────────────────────────────

function generateWhatsApp(results, { dateLabel, dateShort, totalNew, newThreshold }) {
  const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
  const mes3 = results.filter(r => r.group === 'mes-chaines');
  const top5 = results.filter(r => r.group === 'top5-global');

  function channelBlock(r) {
    const lines = [`📌 *${r.name}* ${r.flag}`];
    if (r.status === 'error') {
      lines.push(`   ⚠ Erreur : ${r.errorMsg}`);
      return lines.join('\n');
    }
    if (!r.videos.length) {
      lines.push(`   — Aucune vidéo récupérée`);
      return lines.join('\n');
    }
    r.videos.slice(0, 3).forEach(v => {
      const newMark = isNew(v.published, newThreshold) ? '🔴 ' : '• ';
      const viewsTxt = v.views > 0 ? ` 👀 ${fmtViews(v.views)}` : '';
      const title = v.title.length > 60 ? v.title.slice(0, 57) + '…' : v.title;
      lines.push(`   ${newMark}${relativeDate(v.published)} : "${title}"${viewsTxt}`);
    });
    return lines.join('\n');
  }

  const nextDate = new Date(Date.now() + 2 * 86400000)
    .toLocaleDateString('fr-FR', { weekday:'long', day:'numeric', month:'long' });

  const lines = [
    `📺 *VEILLE YOUTUBE — ${cap(dateLabel)}*`,
    `━━━━━━━━━━━━━━━━━━━━━━━`,
    ``,
    `🇫🇷 *MES 3 CHAÎNES*`,
    `──────────────────`,
    ...mes3.map(channelBlock),
    ``,
    `🌍 *TOP 5 MONDIAL IA/BUSINESS*`,
    `──────────────────────────────`,
    ...top5.map(channelBlock),
    ``,
    `━━━━━━━━━━━━━━━━━━━━━━━`,
    `📊 *Résumé :* ${totalNew} nouvelle(s) vidéo(s) sur ${results.length} chaînes`,
    `⏰ *Prochaine veille :* ${cap(nextDate)} à 11h00`,
  ];

  return lines.join('\n');
}

// ─── HTML escape ──────────────────────────────────────────────────────────────

function escHtml(s) {
  return String(s)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

// ─── Run ──────────────────────────────────────────────────────────────────────
main().catch(err => { console.error('FATAL:', err); process.exit(1); });
