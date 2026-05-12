'use client'
import { useState, useEffect, useCallback } from 'react'

// ─── helpers ────────────────────────────────────────────────────────────────
function parseDuration(iso) {
  if (!iso) return ''
  const m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
  if (!m) return ''
  const h = m[1] ? `${m[1]}h ` : ''
  const min = m[2] ? `${m[2]}m ` : ''
  const s = m[3] ? `${m[3]}s` : ''
  return `${h}${min}${s}`.trim()
}

function fmtDate(iso) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })
}

function fmtViews(n) {
  if (!n) return ''
  const num = parseInt(n, 10)
  if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M vues`
  if (num >= 1e3) return `${(num / 1e3).toFixed(0)}k vues`
  return `${num} vues`
}

// ─── Export ─────────────────────────────────────────────────────────────────
function buildExport(videos, selections) {
  const deployer = videos.filter((v) => selections[v.id] === 'deploy')
  const supprimer = videos.filter((v) => selections[v.id] === 'delete')
  const nonClasse = videos.filter((v) => !selections[v.id])

  const lines = []
  lines.push('=== VIDÉOS À DÉPLOYER ===')
  deployer.forEach((v, i) => {
    lines.push(`\n${i + 1}. ${v.title}`)
    lines.push(`   URL : ${v.url}`)
    lines.push(`   Description : ${v.description?.slice(0, 150) || '(aucune)'}`)
  })
  lines.push('\n\n=== VIDÉOS À SUPPRIMER ===')
  supprimer.forEach((v, i) => {
    lines.push(`\n${i + 1}. ${v.title}`)
    lines.push(`   URL : ${v.url}`)
  })
  lines.push('\n\n=== NON CLASSÉES ===')
  nonClasse.forEach((v, i) => {
    lines.push(`\n${i + 1}. ${v.title}`)
    lines.push(`   URL : ${v.url}`)
  })
  return lines.join('\n')
}

// ─── VideoRow ────────────────────────────────────────────────────────────────
function VideoRow({ video, selection, onChange }) {
  const [expanded, setExpanded] = useState(false)

  const rowBg =
    selection === 'deploy'
      ? '#0d2b1a'
      : selection === 'delete'
      ? '#2b0d0d'
      : 'transparent'

  return (
    <tr style={{ background: rowBg, borderBottom: '1px solid #2a2a2a', transition: 'background .2s' }}>
      {/* Thumbnail */}
      <td style={{ padding: '10px', width: 120, verticalAlign: 'top' }}>
        <a href={video.url} target="_blank" rel="noopener noreferrer">
          {video.thumbnail ? (
            <img
              src={video.thumbnail}
              alt={video.title}
              style={{ width: 110, height: 62, objectFit: 'cover', borderRadius: 4, display: 'block' }}
            />
          ) : (
            <div style={{ width: 110, height: 62, background: '#222', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555', fontSize: 11 }}>
              no thumb
            </div>
          )}
        </a>
      </td>

      {/* Title + desc */}
      <td style={{ padding: '10px', verticalAlign: 'top' }}>
        <a
          href={video.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#e8e8e8', fontWeight: 600, fontSize: 14, textDecoration: 'none', lineHeight: 1.3, display: 'block', marginBottom: 4 }}
        >
          {video.title}
        </a>
        <div style={{ color: '#888', fontSize: 11, marginBottom: 4 }}>
          {video.channel} · {fmtDate(video.publishedAt)} · {parseDuration(video.duration)} · {fmtViews(video.viewCount)}
        </div>
        {video.description && (
          <>
            <div
              style={{
                color: '#aaa',
                fontSize: 12,
                lineHeight: 1.5,
                whiteSpace: 'pre-wrap',
                maxHeight: expanded ? 'none' : 60,
                overflow: 'hidden',
              }}
            >
              {video.description}
            </div>
            {video.description.length > 100 && (
              <button
                onClick={() => setExpanded(!expanded)}
                style={{ background: 'none', border: 'none', color: '#5b9cf6', cursor: 'pointer', fontSize: 11, padding: '2px 0', marginTop: 2 }}
              >
                {expanded ? '▲ Réduire' : '▼ Voir plus'}
              </button>
            )}
          </>
        )}
      </td>

      {/* Déployer checkbox */}
      <td style={{ padding: '10px', textAlign: 'center', verticalAlign: 'middle', width: 90 }}>
        <label style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <input
            type="checkbox"
            checked={selection === 'deploy'}
            onChange={() => onChange(video.id, selection === 'deploy' ? null : 'deploy')}
            style={{ width: 18, height: 18, accentColor: '#22c55e', cursor: 'pointer' }}
          />
          <span style={{ fontSize: 10, color: '#22c55e' }}>Déployer</span>
        </label>
      </td>

      {/* Supprimer checkbox */}
      <td style={{ padding: '10px', textAlign: 'center', verticalAlign: 'middle', width: 90 }}>
        <label style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <input
            type="checkbox"
            checked={selection === 'delete'}
            onChange={() => onChange(video.id, selection === 'delete' ? null : 'delete')}
            style={{ width: 18, height: 18, accentColor: '#ef4444', cursor: 'pointer' }}
          />
          <span style={{ fontSize: 10, color: '#ef4444' }}>Supprimer</span>
        </label>
      </td>
    </tr>
  )
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function YouTubeOrganizerPage() {
  const [connected, setConnected] = useState(false)
  const [loading, setLoading] = useState(true)
  const [playlists, setPlaylists] = useState([])
  const [selectedPlaylist, setSelectedPlaylist] = useState(null)
  const [videos, setVideos] = useState([])
  const [videosLoading, setVideosLoading] = useState(false)
  const [selections, setSelections] = useState({})
  const [search, setSearch] = useState('')
  const [filterMode, setFilterMode] = useState('all') // all | deploy | delete | none
  const [exported, setExported] = useState(false)
  const [playlistsLoaded, setPlaylistsLoaded] = useState(false)

  // Check connection status on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('connected') === '1') {
      window.history.replaceState({}, '', '/youtube-organizer')
    }
    checkToken()
  }, [])

  async function checkToken() {
    setLoading(true)
    try {
      const res = await fetch('/api/youtube/token')
      const data = await res.json()
      setConnected(data.connected)
    } catch {
      setConnected(false)
    } finally {
      setLoading(false)
    }
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
        // Auto-select playlist named "IA" if found
        const ia = data.playlists.find((p) => p.title.toLowerCase() === 'ia' || p.title.toLowerCase().includes(' ia') || p.title.toLowerCase().startsWith('ia '))
        if (ia) setSelectedPlaylist(ia)
      }
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    if (connected) loadPlaylists()
  }, [connected])

  async function loadVideos(playlist) {
    setSelectedPlaylist(playlist)
    setVideos([])
    setSelections({})
    setSearch('')
    setVideosLoading(true)
    try {
      const res = await fetch(`/api/youtube/videos?playlistId=${playlist.id}`)
      if (res.status === 401) { setConnected(false); return }
      const data = await res.json()
      setVideos(data.videos || [])
    } catch (e) {
      console.error(e)
    } finally {
      setVideosLoading(false)
    }
  }

  function handleSelection(videoId, value) {
    setSelections((prev) => ({ ...prev, [videoId]: value }))
  }

  function bulkSelect(action) {
    const visible = filteredVideos()
    setSelections((prev) => {
      const next = { ...prev }
      visible.forEach((v) => { next[v.id] = action })
      return next
    })
  }

  function clearAll() {
    const visible = filteredVideos()
    setSelections((prev) => {
      const next = { ...prev }
      visible.forEach((v) => { delete next[v.id] })
      return next
    })
  }

  function filteredVideos() {
    let list = videos
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        (v) => v.title.toLowerCase().includes(q) || (v.description || '').toLowerCase().includes(q)
      )
    }
    if (filterMode === 'deploy') list = list.filter((v) => selections[v.id] === 'deploy')
    if (filterMode === 'delete') list = list.filter((v) => selections[v.id] === 'delete')
    if (filterMode === 'none') list = list.filter((v) => !selections[v.id])
    return list
  }

  function doExport() {
    const text = buildExport(videos, selections)
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `tri-videos-${selectedPlaylist?.title || 'playlist'}-${new Date().toISOString().slice(0, 10)}.txt`
    a.click()
    URL.revokeObjectURL(url)
    setExported(true)
    setTimeout(() => setExported(false), 3000)
  }

  async function disconnect() {
    await fetch('/api/youtube/token', { method: 'DELETE' })
    setConnected(false)
    setPlaylists([])
    setVideos([])
    setSelections({})
    setPlaylistsLoaded(false)
    setSelectedPlaylist(null)
  }

  const visible = filteredVideos()
  const deployCount = Object.values(selections).filter((v) => v === 'deploy').length
  const deleteCount = Object.values(selections).filter((v) => v === 'delete').length
  const noneCount = videos.length - deployCount - deleteCount

  // ─── STYLES ────────────────────────────────────────────────────────────────
  const S = {
    page: {
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      background: '#0f0f0f',
      color: '#e8e8e8',
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      overflowY: 'auto',
      paddingBottom: 60,
    },
    header: {
      background: '#161616',
      borderBottom: '1px solid #2a2a2a',
      padding: '16px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 12,
    },
    logo: { display: 'flex', alignItems: 'center', gap: 10 },
    title: { fontSize: 20, fontWeight: 700, color: '#fff', margin: 0 },
    subtitle: { fontSize: 13, color: '#888', margin: '2px 0 0' },
    btn: (color) => ({
      background: color,
      color: '#fff',
      border: 'none',
      borderRadius: 6,
      padding: '8px 16px',
      cursor: 'pointer',
      fontSize: 13,
      fontWeight: 600,
    }),
    btnOutline: {
      background: 'transparent',
      color: '#e8e8e8',
      border: '1px solid #444',
      borderRadius: 6,
      padding: '7px 16px',
      cursor: 'pointer',
      fontSize: 13,
    },
    inner: { maxWidth: 1100, margin: '0 auto', padding: '24px 16px' },
    connectBox: {
      textAlign: 'center',
      padding: '80px 24px',
    },
    ytBtn: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      background: '#ff0000',
      color: '#fff',
      border: 'none',
      borderRadius: 8,
      padding: '14px 28px',
      fontSize: 16,
      fontWeight: 700,
      cursor: 'pointer',
      textDecoration: 'none',
    },
    statsBar: {
      display: 'flex',
      gap: 16,
      flexWrap: 'wrap',
      marginBottom: 16,
    },
    statChip: (color) => ({
      background: '#1a1a1a',
      border: `1px solid ${color}`,
      borderRadius: 20,
      padding: '4px 14px',
      fontSize: 13,
      color: color,
    }),
    toolbar: {
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap',
      marginBottom: 16,
      alignItems: 'center',
    },
    searchInput: {
      background: '#1a1a1a',
      border: '1px solid #333',
      borderRadius: 6,
      color: '#e8e8e8',
      padding: '7px 12px',
      fontSize: 13,
      flex: '1 1 200px',
      minWidth: 180,
      outline: 'none',
    },
    filterBtn: (active) => ({
      background: active ? '#2a2a2a' : 'transparent',
      color: active ? '#fff' : '#888',
      border: '1px solid ' + (active ? '#555' : '#333'),
      borderRadius: 6,
      padding: '6px 12px',
      cursor: 'pointer',
      fontSize: 12,
    }),
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: 13,
    },
    th: {
      background: '#1a1a1a',
      color: '#aaa',
      fontSize: 11,
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      padding: '10px 12px',
      textAlign: 'left',
      borderBottom: '1px solid #2a2a2a',
    },
    playlistGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
      gap: 12,
      marginBottom: 24,
    },
    playlistCard: (selected) => ({
      background: selected ? '#1a2a1a' : '#1a1a1a',
      border: `1px solid ${selected ? '#22c55e' : '#2a2a2a'}`,
      borderRadius: 8,
      padding: 12,
      cursor: 'pointer',
      transition: 'all .15s',
    }),
  }

  // ─── RENDER ─────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div style={S.page}>
        <div style={{ textAlign: 'center', paddingTop: 120, color: '#666', fontSize: 14 }}>
          Chargement…
        </div>
      </div>
    )
  }

  return (
    <div style={S.page}>
      {/* Header */}
      <div style={S.header}>
        <div style={S.logo}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="#ff0000">
            <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z"/>
          </svg>
          <div>
            <div style={S.title}>YouTube Organizer</div>
            <div style={S.subtitle}>Triez vos vidéos — Déployer ou Supprimer</div>
          </div>
        </div>
        {connected && (
          <button onClick={disconnect} style={S.btnOutline}>
            Déconnecter
          </button>
        )}
      </div>

      <div style={S.inner}>
        {/* Not connected */}
        {!connected && (
          <div style={S.connectBox}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📺</div>
            <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>
              Connectez votre compte YouTube
            </h2>
            <p style={{ color: '#888', fontSize: 14, marginBottom: 32, maxWidth: 400, margin: '0 auto 32px' }}>
              Autorisez l&apos;accès en lecture seule à vos playlists pour trier vos vidéos.
              <br />
              <br />
              Configurez d&apos;abord vos variables d&apos;environnement :
              <code style={{ display: 'block', background: '#1a1a1a', border: '1px solid #333', borderRadius: 6, padding: 12, marginTop: 12, fontSize: 12, textAlign: 'left', color: '#aaa' }}>
                YOUTUBE_CLIENT_ID=...<br />
                YOUTUBE_CLIENT_SECRET=...<br />
                NEXT_PUBLIC_BASE_URL=http://localhost:3000
              </code>
            </p>
            <a href="/api/youtube/auth" style={S.ytBtn}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z"/>
              </svg>
              Se connecter avec YouTube
            </a>
          </div>
        )}

        {/* Connected — choose playlist */}
        {connected && !selectedPlaylist && (
          <>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>
              Choisissez une playlist
            </h2>
            {playlists.length === 0 ? (
              <p style={{ color: '#888' }}>Chargement des playlists…</p>
            ) : (
              <div style={S.playlistGrid}>
                {playlists.map((p) => (
                  <div key={p.id} style={S.playlistCard(false)} onClick={() => loadVideos(p)}>
                    <div style={{ fontWeight: 600, fontSize: 14, color: '#e8e8e8', marginBottom: 4 }}>{p.title}</div>
                    <div style={{ color: '#888', fontSize: 11 }}>{p.count} vidéo{p.count !== 1 ? 's' : ''}</div>
                    {p.description && (
                      <div style={{ color: '#666', fontSize: 11, marginTop: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {p.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Connected — video list */}
        {connected && selectedPlaylist && (
          <>
            {/* Breadcrumb */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
              <button
                onClick={() => { setSelectedPlaylist(null); setVideos([]); setSelections({}) }}
                style={{ ...S.btnOutline, fontSize: 12, padding: '5px 10px' }}
              >
                ← Changer de playlist
              </button>
              <span style={{ color: '#888', fontSize: 13 }}>
                Playlist : <strong style={{ color: '#e8e8e8' }}>{selectedPlaylist.title}</strong>
                {videos.length > 0 && <span style={{ color: '#666' }}> — {videos.length} vidéos</span>}
              </span>
            </div>

            {videosLoading && (
              <div style={{ textAlign: 'center', padding: '60px 0', color: '#666' }}>
                Chargement des vidéos…
              </div>
            )}

            {!videosLoading && videos.length > 0 && (
              <>
                {/* Stats */}
                <div style={S.statsBar}>
                  <span style={S.statChip('#22c55e')}>✓ {deployCount} à déployer</span>
                  <span style={S.statChip('#ef4444')}>✕ {deleteCount} à supprimer</span>
                  <span style={S.statChip('#888')}>? {noneCount} non classées</span>
                </div>

                {/* Toolbar */}
                <div style={S.toolbar}>
                  <input
                    type="text"
                    placeholder="Rechercher par titre ou description…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={S.searchInput}
                  />

                  <div style={{ display: 'flex', gap: 4 }}>
                    {[
                      ['all', 'Toutes'],
                      ['deploy', '✓ Déployer'],
                      ['delete', '✕ Supprimer'],
                      ['none', '? Non classées'],
                    ].map(([mode, label]) => (
                      <button
                        key={mode}
                        onClick={() => setFilterMode(mode)}
                        style={S.filterBtn(filterMode === mode)}
                      >
                        {label}
                      </button>
                    ))}
                  </div>

                  <button onClick={() => bulkSelect('deploy')} style={S.btn('#16a34a')}>
                    Tout Déployer
                  </button>
                  <button onClick={() => bulkSelect('delete')} style={S.btn('#dc2626')}>
                    Tout Supprimer
                  </button>
                  <button onClick={clearAll} style={S.btnOutline}>
                    Effacer sélection
                  </button>

                  <button
                    onClick={doExport}
                    style={{ ...S.btn('#2563eb'), marginLeft: 'auto' }}
                  >
                    {exported ? '✓ Exporté !' : '⬇ Exporter .txt'}
                  </button>
                </div>

                {/* Table */}
                <div style={{ border: '1px solid #2a2a2a', borderRadius: 8, overflow: 'hidden' }}>
                  <table style={S.table}>
                    <thead>
                      <tr>
                        <th style={S.th}>Vidéo</th>
                        <th style={{ ...S.th, flex: 1 }}>Titre · Description</th>
                        <th style={{ ...S.th, textAlign: 'center', width: 90 }}>Déployer</th>
                        <th style={{ ...S.th, textAlign: 'center', width: 90 }}>Supprimer</th>
                      </tr>
                    </thead>
                    <tbody>
                      {visible.length === 0 ? (
                        <tr>
                          <td colSpan={4} style={{ textAlign: 'center', padding: 40, color: '#555' }}>
                            Aucune vidéo trouvée
                          </td>
                        </tr>
                      ) : (
                        visible.map((v) => (
                          <VideoRow
                            key={v.id}
                            video={v}
                            selection={selections[v.id] || null}
                            onChange={handleSelection}
                          />
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                <div style={{ textAlign: 'center', marginTop: 12, color: '#555', fontSize: 12 }}>
                  {visible.length} vidéo{visible.length !== 1 ? 's' : ''} affichée{visible.length !== 1 ? 's' : ''}
                </div>
              </>
            )}

            {!videosLoading && videos.length === 0 && (
              <div style={{ textAlign: 'center', padding: 60, color: '#666' }}>
                Aucune vidéo dans cette playlist.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
