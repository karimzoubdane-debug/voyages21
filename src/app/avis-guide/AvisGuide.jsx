'use client'

import { useMemo, useState } from 'react'

const GOOGLE_AVIS_URL =
  'https://search.google.com/local/writereview?placeid=ChIJPaMFhYzurw0R50-J4mRz7oc'

// Listes facilement modifiables (voyages, services, autre)
const SUJETS = [
  {
    groupe: 'Nos voyages',
    options: [
      'Marrakech',
      'Désert & Sahara',
      'Circuit au Maroc',
      'Villes impériales',
      'Nord du Maroc (Chefchaouen, Tanger…)',
      'Séjour balnéaire (Agadir…)',
      'Hajj & Omra',
      'Croisière',
      'Voyage sur mesure',
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

// Variantes de formulation (pour éviter des avis identiques)
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

function sujetPhrase(sujet) {
  if (!sujet) return ''
  if (sujet === 'Autre') return ''
  if (sujet === 'Accueil & conseil en agence')
    return 'L’accueil et les conseils en agence ont été au top. '
  if (sujet === 'Organisation & suivi du voyage')
    return 'L’organisation et le suivi de notre voyage ont été parfaits. '
  if (sujet === 'Réservation (vol, hôtel…)')
    return 'La réservation a été simple et bien gérée. '
  if (sujet === 'Hajj & Omra')
    return 'Pour notre Hajj/Omra, tout a été parfaitement organisé. '
  if (sujet === 'Croisière') return 'Notre croisière s’est très bien passée. '
  if (sujet === 'Voyage sur mesure')
    return 'Notre voyage sur mesure correspondait exactement à nos envies. '
  return `Nous avons adoré notre voyage (${sujet}). `
}

function genererAvis({ sujet, aspects, conseiller, note, seed }) {
  const pick = (arr) => arr[seed % arr.length]
  const parts = []
  parts.push(pick(INTROS))

  const sp = sujetPhrase(sujet)
  if (sp) parts.push(sp.trim())

  if (aspects.length) {
    const liste = aspects.map((a) => a.toLowerCase())
    let texte
    if (liste.length === 1) texte = `J’ai particulièrement apprécié ${liste[0]}.`
    else
      texte = `J’ai particulièrement apprécié : ${liste
        .slice(0, -1)
        .join(', ')} et ${liste[liste.length - 1]}.`
    parts.push(texte)
  }

  if (conseiller.trim())
    parts.push(`Un grand merci à ${conseiller.trim()} pour son professionnalisme et sa gentillesse.`)

  if (note.trim()) parts.push(note.trim())

  parts.push(pick(CLOTURES))
  return parts.join(' ')
}

export default function AvisGuide() {
  const [sujet, setSujet] = useState('')
  const [aspects, setAspects] = useState([])
  const [conseiller, setConseiller] = useState('')
  const [note, setNote] = useState('')
  const [seed, setSeed] = useState(0)
  const [copie, setCopie] = useState(false)

  const avis = useMemo(
    () => genererAvis({ sujet, aspects, conseiller, note, seed }),
    [sujet, aspects, conseiller, note, seed]
  )

  const toggleAspect = (a) =>
    setAspects((prev) =>
      prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]
    )

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

  const card = {
    background: '#fff',
    border: '2px solid #C8A440',
    borderRadius: 16,
    padding: 20,
    marginBottom: 18,
    boxShadow: '0 8px 28px rgba(27,58,40,.10)',
  }
  const labelStyle = { fontWeight: 700, color: '#1B3A28', display: 'block', marginBottom: 8 }

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

      {/* 1. Sujet */}
      <section style={card}>
        <label htmlFor="sujet" style={labelStyle}>
          1. Votre avis concerne…
        </label>
        <select
          id="sujet"
          value={sujet}
          onChange={(e) => setSujet(e.target.value)}
          style={{
            width: '100%',
            padding: '13px 12px',
            fontSize: 16,
            borderRadius: 10,
            border: '1.5px solid #cdd5cd',
            background: '#fff',
            color: '#152E1F',
          }}
        >
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

      {/* 2. Aspects */}
      <section style={card}>
        <span style={labelStyle}>2. Ce qui vous a marqué (cochez ce qui vous parle)</span>
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

      {/* 3. Conseiller + mot perso */}
      <section style={card}>
        <label htmlFor="conseiller" style={labelStyle}>
          3. Le prénom de votre conseiller (facultatif)
        </label>
        <input
          id="conseiller"
          value={conseiller}
          onChange={(e) => setConseiller(e.target.value)}
          placeholder="Ex. Karim, Wafa, Fouad…"
          style={{
            width: '100%',
            padding: '13px 12px',
            fontSize: 16,
            borderRadius: 10,
            border: '1.5px solid #cdd5cd',
            marginBottom: 16,
          }}
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
          style={{
            width: '100%',
            padding: '13px 12px',
            fontSize: 16,
            borderRadius: 10,
            border: '1.5px solid #cdd5cd',
            resize: 'vertical',
            fontFamily: 'inherit',
          }}
        />
      </section>

      {/* Aperçu de l'avis */}
      <section style={{ ...card, background: '#F5F0E8' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10,
          }}
        >
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
        ⭐ Ouvrir Google et coller mon avis
      </button>

      <p style={{ fontSize: 14, color: '#3a4a3f', textAlign: 'center', marginTop: 14, lineHeight: 1.5 }}>
        👉 Sur Google : appuyez sur la case commentaire, faites <b>appui long → Coller</b>,
        mettez <b>5 étoiles</b> puis <b>Publier</b>. Merci ! 🙏
      </p>
    </div>
  )
}
