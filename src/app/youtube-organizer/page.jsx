'use client'
import { useState, useEffect } from 'react'
import * as XLSX from 'xlsx'

// ─── Categorie auto ───────────────────────────────────────────────────────────
const CATEGORIES = [
  { id: 'chatgpt', label: 'ChatGPT et LLMs', color: '#10a37f', keywords: ['chatgpt', 'gpt-4', 'gpt4', 'llm', 'claude', 'gemini', 'mistral', 'openai', 'ollama', 'prompt', 'llama', 'copilot', 'perplexity'] },
  { id: 'automation', label: 'Automatisation et No-Code', color: '#f97316', keywords: ['zapier', 'make.com', 'n8n', 'automation', 'automatisation', 'workflow', 'no-code', 'nocode', 'airtable', 'integromat', 'automate', 'webhook', 'trigger'] },
  { id: 'video_image', label: 'Video et Image IA', color: '#a855f7', keywords: ['midjourney', 'stable diffusion', 'dall-e', 'runway', 'sora', 'heygen', 'synthesia', 'kling', 'pika', 'leonardo', 'firefly', 'imagen', 'flux'] },
  { id: 'dev', label: 'Developpement et Code', color: '#3b82f6', keywords: ['python', 'javascript', 'typescript', 'github', 'react', 'next.js', 'api', 'supabase', 'firebase', 'cursor', 'langchain', 'rag', 'backend', 'frontend'] },
  { id: 'marketing', label: 'Marketing et SEO', color: '#ec4899', keywords: ['marketing', 'seo', 'referencement', 'email', 'newsletter', 'funnel', 'copywriting', 'ads', 'publicite', 'leads', 'conversion', 'contenu', 'blog', 'landing page'] },
  { id: 'business', label: 'Business et Monetisation', color: '#eab308', keywords: ['business', 'argent', 'money', 'monetis', 'revenue', 'saas', 'startup', 'entrepreneur', 'vendre', 'client', 'agence', 'freelance'] },
  { id: 'productivity', label: 'Productivite et Organisation', color: '#06b6d4', keywords: ['productivite', 'productivity', 'notion', 'obsidian', 'organisation', 'gestion du temps', 'pkm', 'second brain', 'note', 'task'] },
  { id: 'social', label: 'Reseaux Sociaux et Contenu', color: '#f43f5e', keywords: ['instagram', 'tiktok', 'twitter', 'linkedin', 'youtube', 'social media', 'reseaux', 'createur', 'content creator', 'viral'] },
  { id: 'tools', label: 'Outils et Applications IA', color: '#8b5cf6', keywords: ['outil', 'tool', 'app', 'logiciel', 'software', 'extension', 'plugin', 'notion ai', 'jasper', 'grammarly'] },
  { id: 'other', label: 'Autre', color: '#6b7280', keywords: [] },
]

function categorize(title, description) {
  const text = `${title} ${description}`.toLowerCase()
  for (const cat of CATEGORIES) {
    if (cat.id === 'other') continue
    if (cat.keywords.some((k) => text.includes(k))) return cat.id
  }
  return 'other'
}

// ─── Extraction actions techniques ───────────────────────────────────────────
function extractActions(description) {
  if (!description || description.trim().length < 10) return []

  const numbered = description.match(/(?:^|\n)\s*\d+[\.\)]\s+([^\n]{10,})/g)
  if (numbered && numbered.length >= 2)
    return numbered.slice(0, 8).map((s) => s.replace(/^\s*\d+[\.\)]\s+/, '').trim())

  const bullets = description.match(/(?:^|\n)\s*[-*]\s+([^\n]{10,})/g)
  if (bullets && bullets.length >= 2)
    return bullets.slice(0, 8).map((s) => s.replace(/^\s*[-*]\s+/, '').trim())

  const actionVerbs = /^(installer|creer|creez|apprendre|decouvrir|utiliser|configur|generer|automatiser|optimiser|construire|developper|lancer|deployer|connecter|integrer|mettre|comment|etape|step|how to|setup|connect|build|create|use|install|configure|generate)/i
  const lines = description.split('\n').filter((l) => l.trim().length > 15 && actionVerbs.test(l.trim()))
  if (lines.length >= 2) return lines.slice(0, 6).map((l) => l.trim())

  const sentences = description
    .replace(/https?:\/\/\S+/g, '')
    .split(/[.!?\n]/)
    .map((s) => s.trim())
    .filter((s) => s.length > 25)
  return sentences.slice(0, 4)
}

// ─── Extraction liens ─────────────────────────────────────────────────────────
function extractLinks(description) {
  if (!description) return []
  const urlRegex = /https?:\/\/[^\s\)>\]"']+/g
  const urls = description.match(urlRegex) || []
  const unique = [...new Set(urls)].slice(0, 15)

  return unique.map((url) => {
    // Trouver le contexte autour du lien
    const idx = description.indexOf(url)
    const before = description.slice(Math.max(0, idx - 60), idx).split('\n').pop().trim()
    const label = before.replace(/[-:>*]\s*$/, '').trim() || null

    let domain = ''
    try { domain = new URL(url).hostname.replace('www.', '') } catch {}

    return { url, label: label || domain, domain }
  })
}

// ─── Extraction formations et prix ───────────────────────────────────────────
function extractFormations(description) {
  if (!description) return []
  const results = []
  const lines = description.split('\n')

  const formationKeywords = /formation|cours|programme|mastermind|coaching|bootcamp|mentoring|template|pack|bundle|academy|school|training|module|certification/i
  const priceRegex = /(\d[\d\s]*[,.]?\d*)\s*[€$£]|[€$£]\s*(\d[\d\s]*[,.]?\d*)|(\d+)\s*euros?|gratuit|free|offert/i

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (!formationKeywords.test(line)) continue

    // Chercher un prix dans la ligne et les 3 suivantes
    const context = lines.slice(i, i + 4).join(' ')
    const priceMatch = context.match(priceRegex)
    const price = priceMatch ? priceMatch[0].trim() : null

    // Chercher un lien associe
    const urlMatch = context.match(/https?:\/\/[^\s]+/)
    const url = urlMatch ? urlMatch[0] : null

    const name = line.replace(/https?:\/\/\S+/g, '').replace(/[*_#]/g, '').trim()
    if (name.length > 5) {
      results.push({ name, price, url })
    }
  }

  return results.slice(0, 5)
}

// ─── Pertinence business ─────────────────────────────────────────────────────
const BUSINESS_DOMAINS = [
  {
    id: 'travel',
    label: 'Agence de voyages',
    keywords: [
      'booking', 'reservation', 'crm', 'client', 'newsletter', 'email marketing', 'seo', 'instagram',
      'tiktok', 'contenu', 'marketing', 'landing page', 'devis', 'automatisation client', 'avis',
      'google my business', 'google ads', 'meta ads', 'publicite', 'lead', 'tunnel de vente',
      'chatbot', 'whatsapp', 'automation', 'voyage', 'tourisme', 'agence', 'experience client',
      'personnalise', 'calendly', 'calendrier', 'facturation', 'paiement', 'stripe'
    ],
    useCases: {
      'chatgpt': 'Redaction de descriptions de circuits, reponses clients automatisees, generation de contenu marketing',
      'automation': 'Automatiser les confirmations de reservation, relances clients, envoi de programmes',
      'marketing': 'Campagnes email, SEO pour les circuits, publicite ciblee voyageurs',
      'social': 'Contenus Instagram et TikTok pour attirer des voyageurs, gestion communaute',
      'video_image': 'Visuels pour les circuits, videos promotionnelles de destinations',
      'business': 'Modelisation economique, tarification dynamique, developpement agence',
      'dev': 'Systeme de devis en ligne, CRM personnalise, espace client',
      'tools': 'Outils de gestion de projets voyages, coordination guides et prestataires',
    }
  },
  {
    id: 'apps',
    label: 'Creation d applications',
    keywords: [
      'react', 'next.js', 'python', 'javascript', 'typescript', 'api', 'supabase', 'firebase',
      'vercel', 'cursor', 'github', 'backend', 'frontend', 'database', 'ui/ux', 'figma',
      'no-code', 'bubble', 'webflow', 'framer', 'mvp', 'saas', 'developpement', 'code',
      'deploy', 'hebergement', 'serveur', 'cloud', 'docker', 'langchain', 'rag', 'llm api',
      'openai api', 'anthropic', 'integration', 'webhook', 'stripe', 'auth', 'authentication'
    ],
    useCases: {
      'dev': 'Techniques directement applicables au developpement de vos applications',
      'chatgpt': 'Integration IA dans vos applications, chatbots, generation de contenu automatique',
      'automation': 'Automatisation des workflows de developpement, tests, deploiement',
      'tools': 'Outils de productivite pour developper plus vite et mieux',
      'business': 'Monetisation de vos applications, modele SaaS, pricing',
    }
  },
  {
    id: 'automation',
    label: 'Automatismes',
    keywords: [
      'zapier', 'make', 'n8n', 'automation', 'automatisation', 'workflow', 'webhook', 'trigger',
      'api', 'script', 'python', 'bot', 'schedule', 'cron', 'integromat', 'airtable',
      'notion', 'google sheets', 'slack', 'gmail', 'calendar', 'typeform', 'notion api',
      'automatique', 'synchronisation', 'pipeline', 'flux', 'connecter', 'integrer'
    ],
    useCases: {
      'automation': 'Applications directes : automatiser vos processus metier entre voyages, hebergement et activites',
      'chatgpt': 'Automatiser la creation de contenu, les reponses, les rapports',
      'dev': 'Developper vos propres automatismes sur mesure avec du code',
      'tools': 'Nouveaux outils d automatisation a integrer dans votre stack',
    }
  },
  {
    id: 'accommodation',
    label: 'Hebergement touristique',
    keywords: [
      'airbnb', 'booking.com', 'hebergement', 'hotel', 'riad', 'villa', 'location', 'propriete',
      'tarif', 'pricing', 'ota', 'channel manager', 'calendrier', 'avis', 'review', 'guest',
      'checkin', 'checkout', 'message automatique', 'menage', 'conciergerie', 'sejour',
      'occupation', 'revenue management', 'dynamic pricing', 'hostaway', 'smoobu', 'gestion locative'
    ],
    useCases: {
      'automation': 'Messages automatiques aux guests, synchronisation calendriers, gestion menage',
      'chatgpt': 'Reponses aux avis, descriptions optimisees, guide de bienvenue personnalise',
      'marketing': 'Optimisation des annonces Airbnb et Booking, strategie de contenu',
      'business': 'Revenue management, pricing dynamique, optimisation du taux d occupation',
      'tools': 'Outils de gestion de proprietes, channel managers, PMS',
    }
  },
  {
    id: 'activities',
    label: 'Animation et activites touristiques',
    keywords: [
      'activite', 'excursion', 'tour', 'guide', 'reservation', 'experience', 'evenement',
      'ticketing', 'groupe', 'planning', 'itineraire', 'animation', 'visite', 'atelier',
      'booking activite', 'fareharbor', 'bokun', 'rezdy', 'tripadvisor', 'google things to do',
      'programme', 'outdoor', 'aventure', 'randonnee', 'quad', 'sport'
    ],
    useCases: {
      'automation': 'Automatiser les reservations, confirmations, rappels aux participants',
      'marketing': 'Promouvoir les activites sur les plateformes, Google, Tripadvisor',
      'social': 'Contenus pour attirer des participants, videos d activites, temoignages',
      'chatgpt': 'Descriptions d activites optimisees, reponses FAQ automatiques',
      'video_image': 'Visuels promotionnels pour les activites, videos de terrain',
    }
  },
]

function getBusinessRelevance(title, description, categoryId) {
  const text = `${title} ${description}`.toLowerCase()

  return BUSINESS_DOMAINS.map((domain) => {
    const matchedKeywords = domain.keywords.filter((k) => text.includes(k.toLowerCase()))
    const score = matchedKeywords.length

    let level = 'Non detecte'
    if (score >= 5) level = 'Fort'
    else if (score >= 2) level = 'Moyen'
    else if (score >= 1) level = 'Faible'

    const useCase = domain.useCases[categoryId] || null
    return { domain: domain.label, level, useCase, matchedKeywords: matchedKeywords.slice(0, 4) }
  })
}

// ─── Enrichissement complet ───────────────────────────────────────────────────
function enrichVideo(video) {
  const catId = categorize(video.title, video.description || '')
  return {
    category: catId,
    actions: extractActions(video.description || ''),
    links: extractLinks(video.description || ''),
    formations: extractFormations(video.description || ''),
    businessRelevance: getBusinessRelevance(video.title, video.description || '', catId),
  }
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

function levelColor(level) {
  if (level === 'Fort') return '#22c55e'
  if (level === 'Moyen') return '#f59e0b'
  return '#6b7280'
}

// ─── Export Excel ─────────────────────────────────────────────────────────────
function buildExcelExport(videos, enriched, selections, notes, geminiAnalyses) {
  const rows = videos.map((v) => {
    const e = enriched[v.id] || {}
    const cat = getCat(e.category || 'other')
    const statut = selections[v.id] === 'keep' ? 'GARDER' : selections[v.id] === 'delete' ? 'SUPPRIMER' : 'Non classe'

    const actions = (e.actions || []).join('\n')
    const liens = (e.links || []).map((l) => `${l.label} : ${l.url}`).join('\n')
    const formations = (e.formations || []).map((f) => `${f.name}${f.price ? ' [' + f.price + ']' : ''}${f.url ? ' — ' + f.url : ''}`).join('\n')

    // Pertinence par domaine
    const domainMap = {}
    ;(e.businessRelevance || []).forEach((r) => { domainMap[r.domain] = `[${r.level}] ${r.useCase || ''}` })

    return {
      'Statut': statut,
      'Titre': v.title,
      'URL': v.url,
      'Categorie': cat.label,
      'Description': v.description || '',
      'Actions techniques': actions,
      'Liens et ressources': liens,
      'Formations proposees': formations,
      'Agence de voyages': domainMap['Agence de voyages'] || '',
      'Creation d applications': domainMap["Creation d applications"] || '',
      'Automatismes': domainMap['Automatismes'] || '',
      'Hebergement touristique': domainMap['Hebergement touristique'] || '',
      'Animation touristique': domainMap['Animation et activites touristiques'] || '',
      'Analyse Gemini': (geminiAnalyses && geminiAnalyses[v.id]) ? geminiAnalyses[v.id].replace(/## /g, '\n\n') : '',
      'Note personnelle': (notes && notes[v.id]) || '',
    }
  })

  const ws = XLSX.utils.json_to_sheet(rows)

  // Largeurs des colonnes
  ws['!cols'] = [
    { wch: 12 }, // Statut
    { wch: 50 }, // Titre
    { wch: 45 }, // URL
    { wch: 25 }, // Categorie
    { wch: 60 }, // Description
    { wch: 50 }, // Actions
    { wch: 50 }, // Liens
    { wch: 45 }, // Formations
    { wch: 40 }, // Agence voyages
    { wch: 40 }, // Creation apps
    { wch: 40 }, // Automatismes
    { wch: 40 }, // Hebergement
    { wch: 40 }, // Animation
    { wch: 80 }, // Gemini
    { wch: 50 }, // Note
  ]

  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Videos IA')
  return wb
}

// ─── Bloc section ─────────────────────────────────────────────────────────────
function Section({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div style={{ borderTop: '1px solid #222', marginTop: 10 }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', color: '#bbb', cursor: 'pointer', padding: '8px 0', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <span>{title}</span>
        <span style={{ fontSize: 10, color: '#555' }}>{open ? 'REDUIRE' : 'AFFICHER'}</span>
      </button>
      {open && <div style={{ paddingBottom: 10 }}>{children}</div>}
    </div>
  )
}

// ─── VideoCard ────────────────────────────────────────────────────────────────
function VideoCard({ video, enriched, selection, onChange, note, onNoteChange, geminiAnalysis, onGeminiAnalysis }) {
  const e = enriched || {}
  const cat = getCat(e.category || 'other')
  const [geminiLoading, setGeminiLoading] = useState(false)
  const [geminiError, setGeminiError] = useState(null)

  const borderColor = selection === 'keep' ? '#22c55e' : selection === 'delete' ? '#ef4444' : '#252525'
  const bgColor = selection === 'keep' ? '#0d1f0d' : selection === 'delete' ? '#1f0d0d' : '#141414'

  async function runGemini() {
    setGeminiLoading(true)
    setGeminiError(null)
    try {
      const res = await fetch('/api/youtube/analyze-gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoUrl: video.url }),
      })
      const data = await res.json()
      if (data.error) { setGeminiError(data.error); return }
      onGeminiAnalysis(video.id, data.analysis)
    } catch (err) {
      setGeminiError(err.message)
    } finally {
      setGeminiLoading(false)
    }
  }

  return (
    <div style={{ background: bgColor, border: `1px solid ${borderColor}`, borderRadius: 8, padding: 16, transition: 'border-color .2s, background .2s' }}>

      {/* En-tete */}
      <div style={{ display: 'flex', gap: 14, marginBottom: 12 }}>
        {/* Thumbnail */}
        <div style={{ flexShrink: 0 }}>
          <a href={video.url} target="_blank" rel="noopener noreferrer">
            {video.thumbnail
              ? <img src={video.thumbnail} alt="" style={{ width: 130, height: 73, objectFit: 'cover', borderRadius: 4, display: 'block' }} />
              : <div style={{ width: 130, height: 73, background: '#1e1e1e', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#444', fontSize: 11 }}>aucune image</div>
            }
          </a>
          {/* Boutons */}
          <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>
            <label style={{ flex: 1, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, background: selection === 'keep' ? '#14532d' : '#1a1a1a', border: '1px solid ' + (selection === 'keep' ? '#22c55e' : '#333'), borderRadius: 4, padding: '5px 4px' }}>
              <input type="checkbox" checked={selection === 'keep'} onChange={() => onChange(video.id, selection === 'keep' ? null : 'keep')} style={{ accentColor: '#22c55e', width: 12, height: 12 }} />
              <span style={{ fontSize: 10, color: '#22c55e', fontWeight: 700 }}>GARDER</span>
            </label>
            <label style={{ flex: 1, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, background: selection === 'delete' ? '#450a0a' : '#1a1a1a', border: '1px solid ' + (selection === 'delete' ? '#ef4444' : '#333'), borderRadius: 4, padding: '5px 4px' }}>
              <input type="checkbox" checked={selection === 'delete'} onChange={() => onChange(video.id, selection === 'delete' ? null : 'delete')} style={{ accentColor: '#ef4444', width: 12, height: 12 }} />
              <span style={{ fontSize: 10, color: '#ef4444', fontWeight: 700 }}>SUPPRIMER</span>
            </label>
          </div>
        </div>

        {/* Titre et meta */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
            <span style={{ background: cat.color + '20', border: `1px solid ${cat.color}50`, color: cat.color, fontSize: 10, borderRadius: 3, padding: '2px 7px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.4px' }}>
              {cat.label}
            </span>
            {e.formations?.length > 0 && (
              <span style={{ background: '#1a1500', border: '1px solid #d9770650', color: '#d97706', fontSize: 10, borderRadius: 3, padding: '2px 7px', fontWeight: 700 }}>
                FORMATION
              </span>
            )}
          </div>
          <a href={video.url} target="_blank" rel="noopener noreferrer" style={{ color: '#f0f0f0', fontWeight: 600, fontSize: 14, textDecoration: 'none', display: 'block', marginBottom: 5, lineHeight: 1.4 }}>
            {video.title}
          </a>
          <div style={{ color: '#555', fontSize: 11 }}>
            {[video.channel, parseDuration(video.duration), fmtViews(video.viewCount)].filter(Boolean).join('  ·  ')}
          </div>
          {video.description && (
            <div style={{ color: '#888', fontSize: 12, lineHeight: 1.5, marginTop: 6, maxHeight: 48, overflow: 'hidden' }}>
              {video.description.slice(0, 200)}
            </div>
          )}
        </div>
      </div>

      {/* Blocs detailles */}

      {/* Bloc 1 — Actions techniques */}
      <Section title={`Actions techniques (${(e.actions || []).length})`}>
        {e.actions?.length > 0
          ? <ol style={{ margin: '6px 0 0', paddingLeft: 20 }}>
              {e.actions.map((a, i) => (
                <li key={i} style={{ color: '#c8c8c8', fontSize: 12, lineHeight: 1.6, marginBottom: 3 }}>{a}</li>
              ))}
            </ol>
          : <div style={{ color: '#444', fontSize: 12, paddingTop: 6 }}>Aucune action structuree detectee dans la description.</div>
        }
      </Section>

      {/* Bloc 2 — Liens et ressources */}
      <Section title={`Liens et ressources (${(e.links || []).length})`}>
        {e.links?.length > 0
          ? <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 6 }}>
              {e.links.map((l, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  <span style={{ color: '#555', fontSize: 11, minWidth: 16 }}>{i + 1}.</span>
                  <div>
                    {l.label && l.label !== l.domain && (
                      <span style={{ color: '#aaa', fontSize: 11, marginRight: 6 }}>{l.label}</span>
                    )}
                    <a href={l.url} target="_blank" rel="noopener noreferrer" style={{ color: '#5b9cf6', fontSize: 11, wordBreak: 'break-all' }}>
                      {l.domain || l.url}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          : <div style={{ color: '#444', fontSize: 12, paddingTop: 6 }}>Aucun lien detecte dans la description.</div>
        }
      </Section>

      {/* Bloc 3 — Formations et prix */}
      <Section title={`Formations proposees (${(e.formations || []).length})`}>
        {e.formations?.length > 0
          ? <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 6 }}>
              {e.formations.map((f, i) => (
                <div key={i} style={{ background: '#1a1200', border: '1px solid #3a2a0050', borderRadius: 4, padding: '8px 12px' }}>
                  <div style={{ color: '#d4a017', fontWeight: 600, fontSize: 13, marginBottom: 3 }}>{f.name}</div>
                  {f.price && <div style={{ color: '#f59e0b', fontSize: 12, marginBottom: 3 }}>Prix : {f.price}</div>}
                  {f.url && (
                    <a href={f.url} target="_blank" rel="noopener noreferrer" style={{ color: '#5b9cf6', fontSize: 11, wordBreak: 'break-all' }}>
                      {f.url}
                    </a>
                  )}
                </div>
              ))}
            </div>
          : <div style={{ color: '#444', fontSize: 12, paddingTop: 6 }}>Aucune formation detectee dans la description.</div>
        }
      </Section>

      {/* Bloc 4 — Pertinence business */}
      <Section title="Pertinence pour votre business">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 6 }}>
          {(e.businessRelevance || []).map((r, i) => (
            <div key={i} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 4, padding: '8px 12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: r.useCase && r.level !== 'Non detecte' ? 4 : 0 }}>
                <span style={{ background: levelColor(r.level) + '22', border: `1px solid ${levelColor(r.level)}55`, color: levelColor(r.level), fontSize: 10, borderRadius: 3, padding: '1px 6px', fontWeight: 700, minWidth: 80, textAlign: 'center' }}>
                  {r.level.toUpperCase()}
                </span>
                <span style={{ color: r.level === 'Non detecte' ? '#444' : '#ccc', fontSize: 12, fontWeight: 600 }}>{r.domain}</span>
              </div>
              {r.useCase && r.level !== 'Non detecte' && (
                <div style={{ color: '#888', fontSize: 12, lineHeight: 1.5 }}>{r.useCase}</div>
              )}
              {r.matchedKeywords.length > 0 && (
                <div style={{ marginTop: 4, display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                  {r.matchedKeywords.map((k) => (
                    <span key={k} style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', color: '#666', fontSize: 10, borderRadius: 3, padding: '1px 6px' }}>{k}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* Bloc 5 — Analyse Gemini */}
      <Section title="Analyse Gemini (lecture complete de la video)">
        {!geminiAnalysis && !geminiLoading && (
          <div style={{ paddingTop: 8 }}>
            <button
              onClick={runGemini}
              style={{ background: '#1a3a5c', border: '1px solid #2a5a8c', color: '#7ab8f5', borderRadius: 5, padding: '7px 16px', cursor: 'pointer', fontSize: 12, fontWeight: 700 }}
            >
              Analyser avec Gemini
            </button>
            {geminiError && (
              <div style={{ color: '#ef4444', fontSize: 11, marginTop: 6 }}>{geminiError}</div>
            )}
            <div style={{ color: '#444', fontSize: 11, marginTop: 6 }}>
              Necessite GEMINI_API_KEY dans .env.local — Gemini lit la video entiere et produit une synthese complete.
            </div>
          </div>
        )}
        {geminiLoading && (
          <div style={{ color: '#7ab8f5', fontSize: 12, paddingTop: 8 }}>
            Gemini analyse la video... (30-60 secondes)
          </div>
        )}
        {geminiAnalysis && (
          <div style={{ paddingTop: 8 }}>
            <div
              style={{ color: '#c8c8c8', fontSize: 12, lineHeight: 1.7, whiteSpace: 'pre-wrap', background: '#0d1520', border: '1px solid #1a3050', borderRadius: 4, padding: '10px 14px' }}
              dangerouslySetInnerHTML={{ __html: geminiAnalysis.replace(/## (.+)/g, '<strong style="color:#7ab8f5;display:block;margin:10px 0 4px">$1</strong>') }}
            />
            <button
              onClick={runGemini}
              style={{ background: 'transparent', border: '1px solid #333', color: '#666', borderRadius: 4, padding: '4px 10px', cursor: 'pointer', fontSize: 11, marginTop: 8 }}
            >
              Relancer l analyse
            </button>
          </div>
        )}
      </Section>

      {/* Bloc 6 — Note personnelle */}
      <Section title="Note personnelle">
        <textarea
          value={note || ''}
          onChange={(e) => onNoteChange(video.id, e.target.value)}
          placeholder="Votre analyse, idees d utilisation, next steps..."
          style={{ width: '100%', minHeight: 80, background: '#0d0d1a', border: '1px solid #2a2a4a', borderRadius: 4, color: '#c8c8e8', fontSize: 12, lineHeight: 1.6, padding: '8px 10px', resize: 'vertical', outline: 'none', fontFamily: 'inherit', marginTop: 6, boxSizing: 'border-box' }}
        />
      </Section>
    </div>
  )
}

// ─── Page principale ──────────────────────────────────────────────────────────
export default function YouTubeOrganizerPage() {
  const [connected, setConnected] = useState(false)
  const [loading, setLoading] = useState(true)
  const [playlists, setPlaylists] = useState([])
  const [selectedPlaylist, setSelectedPlaylist] = useState(null)
  const [videos, setVideos] = useState([])
  const [enriched, setEnriched] = useState({})
  const [videosLoading, setVideosLoading] = useState(false)
  const [selections, setSelections] = useState({})
  const [search, setSearch] = useState('')
  const [activeCat, setActiveCat] = useState('all')
  const [filterSel, setFilterSel] = useState('all')
  const [exported, setExported] = useState(false)
  const [playlistsLoaded, setPlaylistsLoaded] = useState(false)
  const [notes, setNotes] = useState({})
  const [geminiAnalyses, setGeminiAnalyses] = useState({})

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
        const ia = data.playlists.find((p) => p.title.toLowerCase() === 'ia' || p.title.toLowerCase().includes('ia'))
        if (ia) loadVideos(ia)
      }
    } catch (e) { console.error(e) }
  }

  useEffect(() => { if (connected) loadPlaylists() }, [connected])

  async function loadVideos(playlist) {
    setSelectedPlaylist(playlist)
    setVideos([]); setEnriched({}); setSelections({}); setSearch(''); setActiveCat('all')
    setVideosLoading(true)
    try {
      const res = await fetch(`/api/youtube/videos?playlistId=${playlist.id}`)
      if (res.status === 401) { setConnected(false); return }
      const data = await res.json()
      const vids = data.videos || []
      setVideos(vids)
      const map = {}
      vids.forEach((v) => { map[v.id] = enrichVideo(v) })
      setEnriched(map)
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
    const wb = buildExcelExport(videos, enriched, selections, notes, geminiAnalyses)
    XLSX.writeFile(wb, `tri-videos-IA-${new Date().toISOString().slice(0, 10)}.xlsx`)
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

  const S = {
    page: { position: 'fixed', inset: 0, zIndex: 9999, background: '#0a0a0a', color: '#e8e8e8', fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif", overflowY: 'auto', paddingBottom: 80 },
    header: { background: '#0f0f0f', borderBottom: '1px solid #1e1e1e', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, position: 'sticky', top: 0, zIndex: 10 },
    inner: { maxWidth: 980, margin: '0 auto', padding: '24px 16px' },
    btn: (color) => ({ background: color, color: '#fff', border: 'none', borderRadius: 5, padding: '7px 14px', cursor: 'pointer', fontSize: 12, fontWeight: 700, letterSpacing: '0.3px' }),
    btnOutline: { background: 'transparent', color: '#999', border: '1px solid #333', borderRadius: 5, padding: '6px 14px', cursor: 'pointer', fontSize: 12 },
  }

  if (loading) return <div style={S.page}><div style={{ textAlign: 'center', paddingTop: 120, color: '#444', fontSize: 13 }}>Chargement...</div></div>

  return (
    <div style={S.page}>
      <div style={S.header}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', letterSpacing: '-0.3px' }}>YouTube Organizer IA</div>
          <div style={{ fontSize: 11, color: '#555', marginTop: 1 }}>Categorisation · Actions techniques · Liens · Formations · Pertinence business</div>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {connected && videos.length > 0 && (
            <button onClick={doExport} style={S.btn('#1d4ed8')}>
              {exported ? 'Exporte !' : 'Exporter rapport .xlsx'}
            </button>
          )}
          {connected && <button onClick={disconnect} style={S.btnOutline}>Deconnecter</button>}
        </div>
      </div>

      <div style={S.inner}>
        {/* Non connecte */}
        {!connected && (
          <div style={{ textAlign: 'center', padding: '80px 24px' }}>
            <div style={{ fontSize: 13, color: '#888', marginBottom: 8 }}>Connectez votre compte YouTube pour commencer</div>
            <div style={{ color: '#444', fontSize: 12, marginBottom: 28, fontFamily: 'monospace', background: '#111', border: '1px solid #222', borderRadius: 6, padding: 12, display: 'inline-block', textAlign: 'left' }}>
              YOUTUBE_CLIENT_ID=...<br />
              YOUTUBE_CLIENT_SECRET=...<br />
              YOUTUBE_REDIRECT_URI=http://localhost:3000/api/youtube/callback<br />
              NEXT_PUBLIC_BASE_URL=http://localhost:3000
            </div>
            <br />
            <a href="/api/youtube/auth" style={{ display: 'inline-block', background: '#cc0000', color: '#fff', borderRadius: 5, padding: '12px 28px', fontSize: 14, fontWeight: 700, textDecoration: 'none', marginTop: 16 }}>
              Se connecter avec YouTube
            </a>
          </div>
        )}

        {/* Choix playlist */}
        {connected && !selectedPlaylist && (
          <>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 16, color: '#ccc' }}>Choisissez une playlist</div>
            {playlists.length === 0
              ? <div style={{ color: '#555', fontSize: 13 }}>Chargement des playlists...</div>
              : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px,1fr))', gap: 8 }}>
                  {playlists.map((p) => (
                    <div key={p.id} onClick={() => loadVideos(p)} style={{ background: '#141414', border: '1px solid #222', borderRadius: 6, padding: 12, cursor: 'pointer' }}>
                      <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 4, color: '#e0e0e0' }}>{p.title}</div>
                      <div style={{ color: '#555', fontSize: 11 }}>{p.count} video{p.count !== 1 ? 's' : ''}</div>
                    </div>
                  ))}
                </div>
              )
            }
          </>
        )}

        {/* Videos */}
        {connected && selectedPlaylist && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
              <button onClick={() => { setSelectedPlaylist(null); setVideos([]); setSelections({}); setEnriched({}) }} style={{ ...S.btnOutline, fontSize: 11, padding: '4px 10px' }}>
                Playlists
              </button>
              <span style={{ color: '#555', fontSize: 13 }}>
                <strong style={{ color: '#e0e0e0' }}>{selectedPlaylist.title}</strong>
                {videos.length > 0 && <span style={{ color: '#444' }}> — {videos.length} videos</span>}
              </span>
            </div>

            {videosLoading && <div style={{ textAlign: 'center', padding: '60px 0', color: '#444', fontSize: 13 }}>Chargement et analyse en cours...</div>}

            {!videosLoading && videos.length > 0 && (
              <>
                {/* Stats */}
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
                  {[
                    [keepCount + ' a garder', '#22c55e'],
                    [deleteCount + ' a supprimer', '#ef4444'],
                    [noneCount + ' non classees', '#555'],
                  ].map(([label, color]) => (
                    <span key={label} style={{ border: `1px solid ${color}44`, color, fontSize: 12, borderRadius: 4, padding: '3px 10px' }}>{label}</span>
                  ))}
                </div>

                {/* Filtres categories */}
                <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 10 }}>
                  <button onClick={() => setActiveCat('all')} style={{ background: activeCat === 'all' ? '#222' : 'transparent', color: activeCat === 'all' ? '#fff' : '#666', border: '1px solid ' + (activeCat === 'all' ? '#444' : '#222'), borderRadius: 4, padding: '4px 10px', cursor: 'pointer', fontSize: 11 }}>
                    Toutes ({videos.length})
                  </button>
                  {CATEGORIES.filter(c => videos.some(v => enriched[v.id]?.category === c.id)).map((cat) => {
                    const count = videos.filter((v) => enriched[v.id]?.category === cat.id).length
                    return (
                      <button key={cat.id} onClick={() => setActiveCat(activeCat === cat.id ? 'all' : cat.id)} style={{ background: activeCat === cat.id ? cat.color + '22' : 'transparent', color: activeCat === cat.id ? cat.color : '#666', border: '1px solid ' + (activeCat === cat.id ? cat.color + '66' : '#222'), borderRadius: 4, padding: '4px 10px', cursor: 'pointer', fontSize: 11 }}>
                        {cat.label} ({count})
                      </button>
                    )
                  })}
                </div>

                {/* Recherche et filtres */}
                <div style={{ display: 'flex', gap: 6, marginBottom: 20, flexWrap: 'wrap' }}>
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ flex: '1 1 200px', background: '#141414', border: '1px solid #222', borderRadius: 5, color: '#e8e8e8', padding: '7px 12px', fontSize: 13, outline: 'none' }}
                  />
                  {[['all', 'Toutes'], ['keep', 'A garder'], ['delete', 'A supprimer'], ['none', 'Non classees']].map(([mode, label]) => (
                    <button key={mode} onClick={() => setFilterSel(mode)} style={{ background: filterSel === mode ? '#1e1e1e' : 'transparent', color: filterSel === mode ? '#fff' : '#666', border: '1px solid ' + (filterSel === mode ? '#444' : '#222'), borderRadius: 5, padding: '6px 10px', cursor: 'pointer', fontSize: 11 }}>
                      {label}
                    </button>
                  ))}
                </div>

                {/* Liste */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {visible.length === 0
                    ? <div style={{ textAlign: 'center', padding: 60, color: '#444', fontSize: 13 }}>Aucune video trouvee</div>
                    : visible.map((v) => (
                      <VideoCard
                        key={v.id}
                        video={v}
                        enriched={enriched[v.id]}
                        selection={selections[v.id] || null}
                        onChange={handleSelection}
                        note={notes[v.id] || ''}
                        onNoteChange={(id, val) => setNotes((prev) => ({ ...prev, [id]: val }))}
                        geminiAnalysis={geminiAnalyses[v.id] || null}
                        onGeminiAnalysis={(id, analysis) => setGeminiAnalyses((prev) => ({ ...prev, [id]: analysis }))}
                      />
                    ))
                  }
                </div>

                <div style={{ textAlign: 'center', marginTop: 16, color: '#333', fontSize: 11 }}>
                  {visible.length} video{visible.length !== 1 ? 's' : ''} affichee{visible.length !== 1 ? 's' : ''}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}
