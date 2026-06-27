'use client'

import { useMemo, useState } from 'react'
import { upload } from '@vercel/blob/client'

const GOOGLE_AVIS_URL =
  'https://search.google.com/local/writereview?placeid=ChIJPaMFhYzurw0R50-J4mRz7oc'

// Listes facilement modifiables (pays / services / autre)
const SUJETS = [
  {
    groupe: 'Pays visité',
    options: [
      'Maroc',
      'Arabie Saoudite (Hajj & Omra)',
      'Turquie',
      'Égypte',
      'Émirats / Dubaï',
      'Espagne',
      'France',
      'Italie',
      'Portugal',
      'Grèce',
      'Thaïlande',
      'Maldives',
      'Indonésie (Bali)',
      'Malaisie',
      'Tanzanie / Zanzibar',
      'Kenya',
      'Afrique du Sud',
      'Autre pays',
    ],
  },
  {
    groupe: 'Nos services',
    options: [
      'Accueil & conseil en agence',
      'Organisation & suivi du voyage',
      'Réservation (vol, hôtel…)',
    ],
  },
  { groupe: 'Autre', options: ['Autre'] },
]

const SERVICES = [
  'Accueil & conseil en agence',
  'Organisation & suivi du voyage',
  'Réservation (vol, hôtel…)',
]

const ASPECTS = [
  'Organisation impeccable',
  'Accueil chaleureux',
  'Conseils personnalisés',
  'Accompagnement sur place',
  'Bon rapport qualité-prix',
  'Hôtels de qualité',
  'Réactivité & disponibilité',
  'Programme bien respecté',
]

const INTROS = [
  'Je recommande vivement Voyages 21.',
  'Très belle expérience avec Voyages 21.',
  'Un grand merci à toute l’équipe de Voyages 21.',
  'Agence sérieuse, professionnelle et à l’écoute.',
  'Excellente agence de voyages, je suis ravi(e).',
]
const CLOTURES = [
  'À refaire sans hésiter !',
  'Je repartirai avec eux les yeux fermés.',
  'Merci encore pour tout 🙏',
  'Je les recommande à 100 %.',
  'Une équipe de confiance.',
]

const MOIS = [
  'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
  'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre',
]

function formatMois(ym) {
  if (!ym) return ''
  const [y, m] = ym.split('-')
  const i = parseInt(m, 10) - 1
  if (isNaN(i) || !MOIS[i]) return ''
  return `${MOIS[i]} ${y}`
}

function sujetPhrase(sujet, dateStr, nbStr) {
  if (!sujet || sujet === 'Autre') return ''
  if (SERVICES.includes(sujet)) {
    if (sujet.startsWith('Accueil'))
      return `L’accueil et les conseils en agence ont été au top${dateStr}.`
    if (sujet.startsWith('Organisation'))
      return `L’organisation et le suivi de notre voyage${dateStr} ont été parfaits.`
    return `La réservation${dateStr} a été simple et bien gérée.`
  }
  if (sujet.includes('Hajj'))
    return `Pour notre Hajj/Omra${dateStr}${nbStr}, tout a été parfaitement organisé.`
  return `Pour notre voyage (${sujet})${dateStr}${nbStr}, tout était parfaitement organisé.`
}

function genererAvis({ sujet, date, nbPersonnes, aspects, conseiller, note, seed }) {
  const pick = (arr) => arr[seed % arr.length]
  const parts = [pick(INTROS)]

  const dm = formatMois(date)
  const dateStr = dm ? ` en ${dm}` : ''
  const n = parseInt(nbPersonnes, 10)
  let nbStr = ''
  if (n === 2) nbStr = ' en couple'
  else if (n >= 3) nbStr = ` à ${n} personnes`

  const sp = sujetPhrase(sujet, dateStr, nbStr)
  if (sp) parts.push(sp)

  if (aspects.length) {
    const liste = aspects.map((a) => a.toLowerCase())
    parts.push(
      liste.length === 1
        ? `J’ai particulièrement apprécié ${liste[0]}.`
        : `J’ai particulièrement apprécié : ${liste.slice(0, -1).join(', ')} et ${liste[liste.length - 1]}.`
    )
  }

  if (conseiller.trim())
    parts.push(`Un grand merci à ${conseiller.trim()} pour son professionnalisme et sa gentillesse.`)

  if (note.trim()) parts.push(note.trim())

  parts.push(pick(CLOTURES))
  return parts.join(' ')
}

export default function AvisGuide() {
  const [sujet, setSujet] = useState('')
  const [date, setDate] = useState('')
  const [nbPersonnes, setNbPersonnes] = useState('')
  const [aspects, setAspects] = useState([])
  const [conseiller, setConseiller] = useState('')
  const [note, setNote] = useState('')
  const [seed, setSeed] = useState(0)
  const [copie, setCopie] = useState(false)

  // Upload témoignage photo/vidéo
  const [consent, setConsent] = useState(false)
  const [upState, setUpState] = useState('idle') // idle | loading | done | error
  const [upName, setUpName] = useState('')

  const avis = useMemo(
    () => genererAvis({ sujet, date, nbPersonnes, aspects, conseiller, note, seed }),
    [sujet, date, nbPersonnes, aspects, conseiller, note, seed]
  )

  const toggleAspect = (a) =>
    setAspects((p) => (p.includes(a) ? p.filter((x) => x !== a) : [...p, a]))

  async function copier() {
    try {
      await navigator.clipboard.writeText(avis)
      setCopie(true)
      setTimeout(() => setCopie(false), 2500)
      return true
    } catch {
      return false
    }
  }

  async function copierEtOuvrir() {
    await copier()
    window.open(GOOGLE_AVIS_URL, '_blank', 'noopener')
  }

  async function onFichier(e) {
    const file = e.target.files && e.target.files[0]
    if (!file || !consent) return
    setUpName(file.name)
    setUpState('loading')
    try {
      await upload(`temoignages/${Date.now()}-${file.name}`, file, {
        access: 'public',
        handleUploadUrl: '/api/temoignage/upload',
        clientPayload: JSON.stringify({ sujet, date, nbPersonnes, avis, consent: true }),
      })
      setUpState('done')
    } catch {
      setUpState('error')
    }
  }

  const card = {
    background: '#fff',
    border: '2px solid #C8A440',
    borderRadius: 16,
    padding: 20,
    marginBottom: 18,
    boxShadow: '0 8px 28px rgba(27,58,40,.10)',
  }
  const labelStyle = { fontWeight: 700, color: '#1B3A28', display: 'block', marginBottom: 8 }
  const field = {
    width: '100%',
    padding: '13px 12px',
    fontSize: 16,
    borderRadius: 10,
    border: '1.5px solid #cdd5cd',
    boxSizing: 'border-box',
    background: '#fff',
    color: '#152E1F',
  }

  return (
    <div style={{ width: '100%', maxWidth: 560 }}>
      <header style={{ textAlign: 'center', marginBottom: 22 }}>
        <div style={{ color: '#C8A440', fontSize: 34, letterSpacing: 4 }}>★ ★ ★ ★ ★</div>
        <h1
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontStyle: 'italic',
            fontSize: 30,
            color: '#1B3A28',
            margin: '6px 0 4px',
          }}
        >
          Aidez-nous à écrire votre avis
        </h1>
        <p style={{ color: '#3a4a3f', fontSize: 15.5, margin: 0 }}>
          Répondez en 30 secondes, on rédige le texte pour vous 🙂
        </p>
      </header>

      {/* 1. Sujet / pays */}
      <section style={card}>
        <label htmlFor="sujet" style={labelStyle}>
          1. Votre avis concerne…
        </label>
        <select id="sujet" value={sujet} onChange={(e) => setSujet(e.target.value)} style={field}>
          <option value="">— Choisissez —</option>
          {SUJETS.map((g) => (
            <optgroup key={g.groupe} label={g.groupe}>
              {g.options.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </section>

      {/* 2. Date + nombre de personnes */}
      <section style={card}>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 180px' }}>
            <label htmlFor="date" style={labelStyle}>
              2. Date du voyage
            </label>
            <input id="date" type="month" value={date} onChange={(e) => setDate(e.target.value)} style={field} />
          </div>
          <div style={{ flex: '1 1 140px' }}>
            <label htmlFor="nb" style={labelStyle}>
              3. Nombre de personnes
            </label>
            <input
              id="nb"
              type="number"
              min="1"
              inputMode="numeric"
              value={nbPersonnes}
              onChange={(e) => setNbPersonnes(e.target.value)}
              placeholder="Ex. 4"
              style={field}
            />
          </div>
        </div>
      </section>

      {/* 4. Aspects */}
      <section style={card}>
        <span style={labelStyle}>4. Ce qui vous a marqué (cochez ce qui vous parle)</span>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9 }}>
          {ASPECTS.map((a) => {
            const on = aspects.includes(a)
            return (
              <button
                key={a}
                type="button"
                onClick={() => toggleAspect(a)}
                style={{
                  border: on ? '2px solid #1B3A28' : '1.5px solid #cdd5cd',
                  background: on ? '#1B3A28' : '#fff',
                  color: on ? '#fff' : '#2c3a31',
                  borderRadius: 30,
                  padding: '9px 14px',
                  fontSize: 14.5,
                  cursor: 'pointer',
                  fontWeight: on ? 700 : 500,
                }}
              >
                {on ? '✓ ' : ''}
                {a}
              </button>
            )
          })}
        </div>
      </section>

      {/* 5. Conseiller + mot perso */}
      <section style={card}>
        <label htmlFor="conseiller" style={labelStyle}>
          5. Le prénom de votre conseiller (facultatif)
        </label>
        <input
          id="conseiller"
          value={conseiller}
          onChange={(e) => setConseiller(e.target.value)}
          placeholder="Ex. Karim, Wafa, Fouad…"
          style={{ ...field, marginBottom: 16 }}
        />
        <label htmlFor="note" style={labelStyle}>
          Un mot personnel (facultatif)
        </label>
        <textarea
          id="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Ajoutez une touche personnelle, ça rend l’avis unique 🙏"
          rows={2}
          style={{ ...field, resize: 'vertical', fontFamily: 'inherit' }}
        />
      </section>

      {/* 6. Photo / vidéo témoignage */}
      <section style={card}>
        <span style={labelStyle}>6. Une photo ou vidéo de votre voyage ? (facultatif)</span>

        {/* Consentement obligatoire avant l'envoi */}
        <label
          style={{
            display: 'flex',
            gap: 10,
            alignItems: 'flex-start',
            fontSize: 14.5,
            color: '#2c3a31',
            background: '#FBF6E7',
            border: '1.5px solid #e3dcc9',
            borderRadius: 10,
            padding: 12,
            marginBottom: 12,
            cursor: 'pointer',
          }}
        >
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            style={{ width: 20, height: 20, flexShrink: 0, marginTop: 1 }}
          />
          <span>
            J’autorise <b>Voyages 21</b> à utiliser ma photo / vidéo sur ses réseaux
            sociaux et supports de communication.
          </span>
        </label>

        <label
          htmlFor="fichier"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            border: '2px dashed #C8A440',
            borderRadius: 12,
            padding: '16px',
            cursor: consent ? 'pointer' : 'not-allowed',
            color: consent ? '#1B3A28' : '#9aa79e',
            fontWeight: 700,
            background: consent ? '#fffdf7' : '#f4f1ea',
            opacity: consent ? 1 : 0.7,
          }}
        >
          ➕ Ajouter une photo / vidéo
        </label>
        <input
          id="fichier"
          type="file"
          accept="image/*,video/*"
          onChange={onFichier}
          disabled={!consent}
          style={{ display: 'none' }}
        />
        {!consent && (
          <p style={{ fontSize: 13, color: '#a07b1e', margin: '8px 0 0' }}>
            ☝️ Cochez la case d’autorisation pour pouvoir envoyer votre fichier.
          </p>
        )}
        {upState === 'loading' && (
          <p style={{ fontSize: 14, color: '#3a4a3f', margin: '10px 0 0' }}>⏳ Envoi de « {upName} »…</p>
        )}
        {upState === 'done' && (
          <div
            style={{
              marginTop: 12,
              background: '#eef5ee',
              border: '1.5px solid #cfe0cf',
              borderRadius: 10,
              padding: 12,
            }}
          >
            <p style={{ fontSize: 14.5, color: '#1B3A28', fontWeight: 700, margin: 0 }}>
              ✓ Merci ! « {upName} » bien envoyé à l’agence 🙏
            </p>
            <p style={{ fontSize: 14, color: '#2c3a31', margin: '8px 0 0' }}>
              📸 <b>Pensez aussi à ajouter cette photo à votre avis Google</b> : dans la
              fenêtre Google, appuyez sur « Ajouter des photos ». Ça donne encore plus de
              poids à votre témoignage !
            </p>
          </div>
        )}
        {upState === 'error' && (
          <p style={{ fontSize: 14, color: '#a23', margin: '10px 0 0' }}>
            Envoi impossible. Réessayez ou envoyez-le par WhatsApp 🙏
          </p>
        )}
        <p style={{ fontSize: 12.5, color: '#7a8a7f', margin: '8px 0 0' }}>
          Votre photo/vidéo est partagée avec l’agence pour ses réseaux. Sur Google, vous
          pouvez aussi ajouter vos photos directement dans votre avis.
        </p>
      </section>

      {/* Aperçu de l'avis */}
      <section style={{ ...card, background: '#F5F0E8' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <span style={labelStyle}>Votre avis</span>
          <button
            type="button"
            onClick={() => setSeed((s) => s + 1)}
            style={{
              border: '1.5px solid #C8A440',
              background: '#fff',
              color: '#1B3A28',
              borderRadius: 30,
              padding: '6px 12px',
              fontSize: 13.5,
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            🔄 Autre formulation
          </button>
        </div>
        <p
          style={{
            fontSize: 17,
            lineHeight: 1.55,
            color: '#152E1F',
            background: '#fff',
            border: '1.5px solid #e3dcc9',
            borderRadius: 10,
            padding: 14,
            margin: 0,
            minHeight: 60,
          }}
        >
          {avis}
        </p>
      </section>

      {/* Rappel 5 étoiles */}
      <div
        style={{
          background: '#FBF6E7',
          border: '2px solid #C8A440',
          borderRadius: 14,
          padding: '14px 16px',
          textAlign: 'center',
          marginBottom: 18,
        }}
      >
        <div style={{ fontSize: 30, letterSpacing: 4, color: '#C8A440' }}>★ ★ ★ ★ ★</div>
        <strong style={{ color: '#1B3A28', fontSize: 16 }}>
          N’oubliez pas de mettre 5 étoiles sur Google 🙏
        </strong>
      </div>

      {/* Boutons */}
      <button
        type="button"
        onClick={copier}
        style={{
          width: '100%',
          padding: '15px 18px',
          fontSize: 17,
          fontWeight: 700,
          borderRadius: 50,
          border: '2px solid #1B3A28',
          background: '#fff',
          color: '#1B3A28',
          cursor: 'pointer',
          marginBottom: 12,
        }}
      >
        {copie ? '✓ Avis copié !' : '📋 Copier mon avis'}
      </button>

      <button
        type="button"
        onClick={copierEtOuvrir}
        style={{
          width: '100%',
          padding: '17px 18px',
          fontSize: 18,
          fontWeight: 700,
          borderRadius: 50,
          border: '3px solid #C8A440',
          background: '#1B3A28',
          color: '#fff',
          cursor: 'pointer',
          boxShadow: '0 12px 30px rgba(27,58,40,.25)',
        }}
      >
        ✅ Copier et valider sur Google
      </button>

      <p style={{ fontSize: 14, color: '#3a4a3f', textAlign: 'center', marginTop: 14, lineHeight: 1.5 }}>
        👉 Sur Google : appuyez sur la case commentaire, faites <b>appui long → Coller</b>,
        mettez <b>5 étoiles</b>, <b>ajoutez vos photos</b> puis <b>Publier</b>. Merci ! 🙏
      </p>
    </div>
  )
}
