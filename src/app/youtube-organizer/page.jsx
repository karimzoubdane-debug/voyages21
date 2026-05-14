'use client'
import { useState, useEffect } from 'react'

// ─── Catégorisation automatique ──────────────────────────────────────────────
const CATEGORIES = [
  { id: 'chatgpt', label: 'ChatGPT & LLMs', color: '#10a37f', keywords: ['chatgpt', 'gpt-4', 'gpt4', 'llm', 'claude', 'gemini', 'mistral', 'openai', 'ollama', 'prompt', 'llama', 'copilot'] },
  { id: 'automation', label: 'Automatisation & No-Code', color: '#f97316', keywords: ['zapier', 'make.com', 'n8n', 'automation', 'automatisation', 'workflow', 'no-code', 'nocode', 'airtable', 'integromat', 'automate'] },
  { id: 'video_image', label: 'Vidéo & Image IA', color: '#a855f7', keywords: ['midjourney', 'stable diffusion', 'dall-e', 'runway', 'sora', 'heygen', 'synthesia', 'kling', 'pika', 'leonardo', 'firefly', 'imagen', 'flux'] },
  { id: 'dev', label: 'Développement & Code', color: '#3b82f6', keywords: ['python', 'javascript', 'typescript', 'github', 'react', 'next.js', 'api', 'code', 'developer', 'développeur', 'cursor', 'copilot', 'langchain', 'rag'] },
  { id: 'marketing', label: 'Marketing & SEO', color: '#ec4899', keywords: ['marketing', 'seo', 'référencement', 'email', 'newsletter', 'funnel', 'copywriting', 'ads', 'publicité', 'leads', 'conversion', 'contenu', 'blog'] },
  { id: 'business', label: 'Business & Monétisation', color: '#eab308', keywords: ['business', 'argent', 'money', 'monétis', 'revenue', 'saas', 'startup', 'entrepreneur', 'vendre', 'client', 'agence', 'freelance'] },
  { id: 'productivity', label: 'Productivité & Organisation', color: '#06b6d4', keywords: ['productivité', 'productivity', 'notion', 'obsidian', 'organisation', 'gestion du temps', 'pkm', 'second brain', 'note', 'task'] },
  { id: 'social', label: 'Réseaux Sociaux & Contenu', color: '#f43f5e', keywords: ['instagram', 'tiktok', 'twitter', 'linkedin', 'youtube', 'social media', 'réseaux', 'créateur', 'content creator', 'viral'] },
  { id: 'tools', label: 'Outils & Applications IA', color: '#8b5cf6', keywords: ['outil', 'tool', 'app', 'logiciel', 'software', 'extension', 'plugin', 'perplexity', 'notion ai', 'jasper', 'grammarly'] },
  { id: 'other', label: 'Autre / Non classé', color: '#6b7280', keywords: [] },
]

function categorize(title, description) {
  const text = `${title} ${description}`.toLowerCase()
  for (const cat of CATEGORIES) {
    if (cat.id === 'other') continue
    if (cat.keywords.some((k) => text.includes(k))) return cat.id
  }
  return 'other'
}

// ─── Extraction des actions clés ─────────────────────────────────────────────
function extractActions(description) {
  if (!description || description.trim().length < 10) return []

  // 1. Listes numérotées : "1. xxx" ou "1) xxx"
  const numbered = description.match(/(?:^|\n)\s*\d+[\.\)]\s+([^\n]{10,})/g)
  if (numbered && numbered.length >= 2) {
    return numbered.slice(0, 6).map((s) => s.replace(/^\s*\d+[\.\)]\s+/, '').trim())
  }

  // 2. Puces : "- xxx" ou "• xxx" ou "* xxx"
  const bullets = description.match(/(?:^|\n)\s*[-•*►✅✔→]\s+([^\n]{10,})/g)
  if (bullets && bullets.length >= 2) {
    return bullets.slice(0, 6).map((s) => s.replace(/^\s*[-•*►✅✔→]\s+/, '').trim())
  }

  // 3. Lignes commençant par un verbe d'action
  const actionVerbs = /^(install|créer|créez|apprendre|découvrir|utiliser|configur|générer|automatiser|optimiser|construire|développer|lancer|déployer|connecter|intégrer|mettre|faire|comment|étape|step|how to)/i
  const lines = description.split('\n').filter((l) => l.trim().length > 15 && actionVerbs.test(l.trim()))
  if (lines.length >= 2) return lines.slice(0, 5).map((l) => l.trim())

  // 4. Fallback : premières phrases significatives
  const sentences = description
    .replace(/https?:\/\/\S+/g, '')
    .split(/[.!?\n]/)
    .map((s) => s.trim())
    .filter((s) => s.length > 20)
  return sentences.slice(0, 4)
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function parseDuration(iso) {
  if (!iso) return ''
  const m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
  if (!m) return ''
  const h = m[1] ? `${m[1]}h ` : ''
  const min = m[2] ? `${m[2]}m ` : ''
  const s = m[3] ? `${m[3]}s` : ''
  return `${h}${min}${s}`.trim()
}

function fmtViews(n) {
  if (!n) return ''
  const num = parseInt(n, 10)
  if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M vues`
  if (num >= 1e3) return `${(num / 1e3).toFixed(0)}k vues`
  return `${num} vues`
}

function getCat(id) {
  return CATEGORIES.find((c) => c.id === id) || CATEGORIES[CATEGORIES.length - 1]
}

// ─── Export ──────────────────────────────────────────────────────────────────
function buildExport(videos, enriched, selections) {
  const kept = videos.filter((v) => selections[v.id] === 'keep')
  const deleted = videos.filter((v) => selections[v.id] === 'delete')

  // Group kept by category
  const byCategory = {}
  kept.forEach((v) => {
    const catId = enriched[v.id]?.category || 'other'
    const cat = getCat(catId)
    if (!byCategory[cat.label]) byCategory[cat.label] = []
    byCategory[cat.label].push(v)
  })

  const lines = []
  lines.push('╔════════════════════════════════════════════╗')
  lines.push('║      RAPPORT DE TRI VIDÉOS YOUTUBE IA      ║')
  lines.push(`║  Généré le ${new Date().toLocaleDateString('fr-FR')} — ${kept.length} vidéos à garder  ║`)
  lines.push('╚════════════════════════════════════════════╝')

  lines.push('\n\n═══════════════════════════════════')
  lines.push('  VIDÉOS SÉLECTIONNÉES PAR CATÉGORIE')
  lines.push('═══════════════════════════════════\n')

  for (const [catLabel, vids] of Object.entries(byCategory)) {
    lines.push(`\n▶ ${catLabel.toUpperCase()} (${vids.length} vidéo${vids.length > 1 ? 's' : ''})`)
    lines.push('─'.repeat(50))
    vids.forEach((v, i) => {
      const e = enriched[v.id]
      lines.push(`\n${i + 1}. ${v.title}`)
      lines.push(`   URL : ${v.url}`)
      if (v.description?.trim()) {
        lines.push(`   Description : ${v.description.slice(0, 200).replace(/\n/g, ' ')}${v.description.length > 200 ? '…' : ''}`)
      }
      if (e?.actions?.length) {
        lines.push('   Actions principales :')
        e.actions.forEach((a, ai) => lines.push(`     ${ai + 1}. ${a}`))
      }
    })
  }

  if (deleted.length > 0) {
    lines.push('\n\n═══════════════════════════════════')
    lines.push('  VIDÉOS À SUPPRIMER')
    lines.push('═══════════════════════════════════')
    deleted.forEach((v, i) => {
      lines.push(`\n${i + 1}. ${v.title}`)
      lines.push(`   URL : ${v.url}`)
    })
  }

  return lines.join('\n')
}

// ─── VideoCard ────────────────────────────────────────────────────────────────
function VideoCard({ video, enriched, selection, onChange }) {
  const [expanded, setExpanded] = useState(false)
  const e = enriched || {}
  const cat = getCat(e.category || 'other')
  const actions = e.actions || []

  const borderColor =
    selection === 'keep' ? '#22c55e' : selection === 'delete' ? '#ef4444' : '#2a2a2a'

  return (
    <div
      style={{
        background: '#161616',
        border: `1px solid ${borderColor}`,
        borderRadius: 10,
        padding: 16,
        display: 'flex',
        gap: 14,
        transition: 'border-color .2s',
      }}
    >
      {/* Thumbnail */}
      <div style={{ flexShrink: 0 }}>
        <a href={video.url} target="_blank" rel="noopener noreferrer">
          {video.thumbnail ? (
            <img src={video.thumbnail} alt="" style={{ width: 120, height: 68, objectFit: 'cover', borderRadius: 6, display: 'block' }} />
          ) : (
            <div style={{ width: 120, height: 68, background: '#222', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#444', fontSize: 11 }}>
              no thumb
            </div>
          )}
        </a>
        <div style={{ marginTop: 6, display: 'flex', gap: 6 }}>
          {/* Garder */}
          <label style={{ flex: 1, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, background: selection === 'keep' ? '#14532d' : '#1a1a1a', border: '1px solid ' + (selection === 'keep' ? '#22c55e' : '#333'), borderRadius: 6, padding: '6px 4px' }}>
            <input type="checkbox" checked={selection === 'keep'} onChange={() => onChange(video.id, selection === 'keep' ? null : 'keep')} style={{ accentColor: '#22c55e', width: 14, height: 14 }} />
            <span style={{ fontSize: 9, color: '#22c55e' }}>Garder</span>
          </label>
          {/* Supprimer */}
          <label style={{ flex: 1, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, background: selection === 'delete' ? '#450a0a' : '#1a1a1a', border: '1px solid ' + (selection === 'delete' ? '#ef4444' : '#333'), borderRadius: 6, padding: '6px 4px' }}>
            <input type="checkbox" checked={selection === 'delete'} onChange={() => onChange(video.id, selection === 'delete' ? null : 'delete')} style={{ accentColor: '#ef4444', width: 14, height: 14 }} />
            <span style={{ fontSize: 9, color: '#ef4444' }}>Supprimer</span>
          </label>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Category badge */}
        <span style={{ display: 'inline-block', background: cat.color + '22', border: `1px solid ${cat.color}55`, color: cat.color, fontSize: 10, borderRadius: 4, padding: '2px 7px', marginBottom: 6 }}>
          {cat.label}
        </span>

        {/* Title */}
        <a href={video.url} target="_blank" rel="noopener noreferrer" style={{ color: '#f0f0f0', fontWeight: 600, fontSize: 14, textDecoration: 'none', display: 'block', marginBottom: 4, lineHeight: 1.4 }}>
          {video.title}
        </a>

        {/* Meta */}
        <div style={{ color: '#666', fontSize: 11, marginBottom: 8 }}>
          {[parseDuration(video.duration), fmtViews(video.viewCount), video.channel].filter(Boolean).join(' · ')}
        </div>

        {/* Description */}
        {video.description && (
          <div style={{ marginBottom: 8 }}>
            <div style={{ color: '#999', fontSize: 12, lineHeight: 1.5, maxHeight: expanded ? 'none' : 40, overflow: 'hidden' }}>
              {video.description}
            </div>
            {video.description.length > 80 && (
              <button onClick={() => setExpanded(!expanded)} style={{ background: 'none', border: 'none', color: '#5b9cf6', cursor: 'pointer', fontSize: 11, padding: '2px 0' }}>
                {expanded ? '▲ Moins' : '▼ Plus'}
              </button>
            )}
          </div>
        )}

        {/* Actions */}
        {actions.length > 0 && (
          <div style={{ background: '#0d1a0d', border: '1px solid #1a3a1a', borderRadius: 6, padding: '8px 12px' }}>
            <div style={{ color: '#4ade80', fontSize: 11, fontWeight: 700, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Actions principales
            </div>
            <ol style={{ margin: 0, paddingLeft: 18 }}>
              {actions.map((a, i) => (
                <li key={i} style={{ color: '#b0d4b0', fontSize: 12, lineHeight: 1.5, marginBottom: 3 }}>
                  {a}
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function YouTubeOrganizerPage() {
  const [connected, setConnected] = useState(false)
  const [loading, setLoading] = useState(true)
  const [playlists, setPlaylists] = useState([])
  const [selectedPlaylist, setSelectedPlaylist] = useState(null)
  const [videos, setVideos] = useState([])
  const [enriched, setEnriched] = useState({}) // { videoId: { category, actions } }
  const [videosLoading, setVideosLoading] = useState(false)
  const [selections, setSelections] = useState({})
  const [search, setSearch] = useState('')
  const [activeCat, setActiveCat] = useState('all')
  const [filterSel, setFilterSel] = useState('all') // all | keep | delete | none
  const [exported, setExported] = useState(false)
  const [playlistsLoaded, setPlaylistsLoaded] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('connected') === '1') window.history.replaceState({}, '', '/youtube-organizer')
    checkToken()
  }, [])

  async function checkToken() {
    setLoading(true)
    try {
      const res = await fetch('/api/youtube/token')
      const data = await res.json()
      setConnected(data.connected)
    } catch { setConnected(false) }
    finally { setLoading(false) }
  }

  async function loadPlaylists() {
    if (playlistsLoaded) return
    setPlaylistsLoaded(true)
    try {
      const res = await fetch('/api/youtube/playlists')
      if (res.status === 401) { setConnected(false); return }
      const data = await res.json()
      if (data.playlists) {
        setPlaylists(data.playlists)
        const ia = data.playlists.find(
          (p) => p.title.toLowerCase() === 'ia' || p.title.toLowerCase().includes('ia')
        )
        if (ia) loadVideos(ia)
      }
    } catch (e) { console.error(e) }
  }

  useEffect(() => { if (connected) loadPlaylists() }, [connected])

  async function loadVideos(playlist) {
    setSelectedPlaylist(playlist)
    setVideos([])
    setEnriched({})
    setSelections({})
    setSearch('')
    setActiveCat('all')
    setVideosLoading(true)
    try {
      const res = await fetch(`/api/youtube/videos?playlistId=${playlist.id}`)
      if (res.status === 401) { setConnected(false); return }
      const data = await res.json()
      const vids = data.videos || []
      setVideos(vids)

      // Enrichissement local : catégorie + actions
      const enrichMap = {}
      vids.forEach((v) => {
        enrichMap[v.id] = {
          category: categorize(v.title, v.description || ''),
          actions: extractActions(v.description || ''),
        }
      })
      setEnriched(enrichMap)
    } catch (e) { console.error(e) }
    finally { setVideosLoading(false) }
  }

  function handleSelection(videoId, value) {
    setSelections((prev) => ({ ...prev, [videoId]: value }))
  }

  function filteredVideos() {
    let list = videos
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter((v) => v.title.toLowerCase().includes(q) || (v.description || '').toLowerCase().includes(q))
    }
    if (activeCat !== 'all') list = list.filter((v) => enriched[v.id]?.category === activeCat)
    if (filterSel === 'keep') list = list.filter((v) => selections[v.id] === 'keep')
    if (filterSel === 'delete') list = list.filter((v) => selections[v.id] === 'delete')
    if (filterSel === 'none') list = list.filter((v) => !selections[v.id])
    return list
  }

  function doExport() {
    const text = buildExport(videos, enriched, selections)
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `tri-videos-IA-${new Date().toISOString().slice(0, 10)}.txt`
    a.click()
    URL.revokeObjectURL(url)
    setExported(true)
    setTimeout(() => setExported(false), 3000)
  }

  async function disconnect() {
    await fetch('/api/youtube/token', { method: 'DELETE' })
    setConnected(false); setPlaylists([]); setVideos([])
    setSelections({}); setPlaylistsLoaded(false); setSelectedPlaylist(null); setEnriched({})
  }

  const visible = filteredVideos()
  const keepCount = Object.values(selections).filter((v) => v === 'keep').length
  const deleteCount = Object.values(selections).filter((v) => v === 'delete').length
  const noneCount = videos.length - keepCount - deleteCount

  // Categories present in current videos
  const presentCats = CATEGORIES.filter(
    (c) => c.id === 'all' || videos.some((v) => enriched[v.id]?.category === c.id)
  )

  const S = {
    page: { position: 'fixed', inset: 0, zIndex: 9999, background: '#0a0a0a', color: '#e8e8e8', fontFamily: "'Segoe UI', system-ui, sans-serif", overflowY: 'auto', paddingBottom: 60 },
    header: { background: '#111', borderBottom: '1px solid #222', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 },
    inner: { maxWidth: 1000, margin: '0 auto', padding: '24px 16px' },
    btn: (color) => ({ background: color, color: '#fff', border: 'none', borderRadius: 6, padding: '7px 14px', cursor: 'pointer', fontSize: 13, fontWeight: 600 }),
    btnOutline: { background: 'transparent', color: '#bbb', border: '1px solid #444', borderRadius: 6, padding: '6px 14px', cursor: 'pointer', fontSize: 13 },
  }

  if (loading) return <div style={S.page}><div style={{ textAlign: 'center', paddingTop: 120, color: '#555' }}>Chargement…</div></div>

  return (
    <div style={S.page}>
      {/* Header */}
      <div style={S.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="#ff0000">
            <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z"/>
          </svg>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>YouTube Organizer IA</div>
            <div style={{ fontSize: 12, color: '#666' }}>Tri par catégories · Actions extraites automatiquement</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {connected && videos.length > 0 && (
            <button onClick={doExport} style={S.btn('#2563eb')}>
              {exported ? '✓ Exporté !' : '⬇ Exporter rapport .txt'}
            </button>
          )}
          {connected && <button onClick={disconnect} style={S.btnOutline}>Déconnecter</button>}
        </div>
      </div>

      <div style={S.inner}>
        {/* Non connecté */}
        {!connected && (
          <div style={{ textAlign: 'center', padding: '80px 24px' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📺</div>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>Connectez votre compte YouTube</h2>
            <p style={{ color: '#888', fontSize: 13, marginBottom: 8 }}>L&apos;outil va récupérer vos playlists, catégoriser les vidéos et extraire les actions clés.</p>
            <p style={{ color: '#555', fontSize: 12, marginBottom: 28 }}>Assurez-vous que <code style={{ background: '#1a1a1a', padding: '2px 6px', borderRadius: 4 }}>.env.local</code> est configuré.</p>
            <a href="/api/youtube/auth" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#ff0000', color: '#fff', borderRadius: 8, padding: '13px 28px', fontSize: 15, fontWeight: 700, textDecoration: 'none' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z"/></svg>
              Se connecter avec YouTube
            </a>
          </div>
        )}

        {/* Connecté — choix playlist */}
        {connected && !selectedPlaylist && (
          <>
            <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 16 }}>Choisissez une playlist</h2>
            {playlists.length === 0
              ? <p style={{ color: '#666' }}>Chargement des playlists…</p>
              : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px,1fr))', gap: 10 }}>
                  {playlists.map((p) => (
                    <div key={p.id} onClick={() => loadVideos(p)} style={{ background: '#161616', border: '1px solid #2a2a2a', borderRadius: 8, padding: 12, cursor: 'pointer' }}>
                      <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 4 }}>{p.title}</div>
                      <div style={{ color: '#666', fontSize: 11 }}>{p.count} vidéo{p.count !== 1 ? 's' : ''}</div>
                    </div>
                  ))}
                </div>
              )
            }
          </>
        )}

        {/* Connecté — vidéos chargées */}
        {connected && selectedPlaylist && (
          <>
            {/* Breadcrumb */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
              <button onClick={() => { setSelectedPlaylist(null); setVideos([]); setSelections({}); setEnriched({}) }} style={{ ...S.btnOutline, fontSize: 12, padding: '4px 10px' }}>
                ← Playlists
              </button>
              <span style={{ color: '#888', fontSize: 13 }}>
                <strong style={{ color: '#e8e8e8' }}>{selectedPlaylist.title}</strong>
                {videos.length > 0 && <span style={{ color: '#555' }}> — {videos.length} vidéos</span>}
              </span>
            </div>

            {videosLoading && <div style={{ textAlign: 'center', padding: '60px 0', color: '#555' }}>Chargement et analyse des vidéos…</div>}

            {!videosLoading && videos.length > 0 && (
              <>
                {/* Stats */}
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16 }}>
                  <span style={{ background: '#0d2b1a', border: '1px solid #22c55e44', color: '#22c55e', fontSize: 12, borderRadius: 20, padding: '3px 12px' }}>✓ {keepCount} à garder</span>
                  <span style={{ background: '#2b0d0d', border: '1px solid #ef444444', color: '#ef4444', fontSize: 12, borderRadius: 20, padding: '3px 12px' }}>✕ {deleteCount} à supprimer</span>
                  <span style={{ background: '#1a1a1a', border: '1px solid #44444455', color: '#888', fontSize: 12, borderRadius: 20, padding: '3px 12px' }}>? {noneCount} non classées</span>
                </div>

                {/* Filtres catégories */}
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
                  <button onClick={() => setActiveCat('all')} style={{ background: activeCat === 'all' ? '#2a2a2a' : 'transparent', color: activeCat === 'all' ? '#fff' : '#888', border: '1px solid ' + (activeCat === 'all' ? '#555' : '#333'), borderRadius: 20, padding: '4px 12px', cursor: 'pointer', fontSize: 12 }}>
                    Toutes ({videos.length})
                  </button>
                  {CATEGORIES.filter(c => c.id !== 'other' && videos.some(v => enriched[v.id]?.category === c.id)).map((cat) => {
                    const count = videos.filter((v) => enriched[v.id]?.category === cat.id).length
                    return (
                      <button key={cat.id} onClick={() => setActiveCat(activeCat === cat.id ? 'all' : cat.id)} style={{ background: activeCat === cat.id ? cat.color + '33' : 'transparent', color: activeCat === cat.id ? cat.color : '#888', border: '1px solid ' + (activeCat === cat.id ? cat.color + '88' : '#333'), borderRadius: 20, padding: '4px 12px', cursor: 'pointer', fontSize: 12 }}>
                        {cat.label} ({count})
                      </button>
                    )
                  })}
                  {videos.some(v => enriched[v.id]?.category === 'other') && (
                    <button onClick={() => setActiveCat(activeCat === 'other' ? 'all' : 'other')} style={{ background: activeCat === 'other' ? '#33333399' : 'transparent', color: '#888', border: '1px solid #333', borderRadius: 20, padding: '4px 12px', cursor: 'pointer', fontSize: 12 }}>
                      Autre ({videos.filter(v => enriched[v.id]?.category === 'other').length})
                    </button>
                  )}
                </div>

                {/* Barre de recherche + filtres sélection */}
                <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
                  <input
                    type="text"
                    placeholder="Rechercher…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ flex: '1 1 200px', background: '#161616', border: '1px solid #333', borderRadius: 6, color: '#e8e8e8', padding: '7px 12px', fontSize: 13, outline: 'none' }}
                  />
                  {[['all','Toutes'],['keep','✓ Garder'],['delete','✕ Supprimer'],['none','? Non classées']].map(([mode, label]) => (
                    <button key={mode} onClick={() => setFilterSel(mode)} style={{ background: filterSel === mode ? '#2a2a2a' : 'transparent', color: filterSel === mode ? '#fff' : '#888', border: '1px solid ' + (filterSel === mode ? '#555' : '#333'), borderRadius: 6, padding: '6px 10px', cursor: 'pointer', fontSize: 12 }}>
                      {label}
                    </button>
                  ))}
                </div>

                {/* Liste de vidéos */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {visible.length === 0
                    ? <div style={{ textAlign: 'center', padding: 60, color: '#555' }}>Aucune vidéo trouvée</div>
                    : visible.map((v) => (
                      <VideoCard
                        key={v.id}
                        video={v}
                        enriched={enriched[v.id]}
                        selection={selections[v.id] || null}
                        onChange={handleSelection}
                      />
                    ))
                  }
                </div>

                <div style={{ textAlign: 'center', marginTop: 12, color: '#444', fontSize: 12 }}>
                  {visible.length} vidéo{visible.length !== 1 ? 's' : ''} affichée{visible.length !== 1 ? 's' : ''}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}
