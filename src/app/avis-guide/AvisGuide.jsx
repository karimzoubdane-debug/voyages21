'use client'

import { useEffect, useMemo, useState } from 'react'
import { upload } from '@vercel/blob/client'

const GOOGLE_AVIS_URL =
  'https://search.google.com/local/writereview?placeid=ChIJPaMFhYzurw0R50-J4mRz7oc'

// ---- Sujet : Hajj / Omra / Qods / Pays visité(s) — bilingue ----
const SUJETS = [
  { key: 'Hajj', fr: 'Hajj', ar: 'الحج' },
  { key: 'Omra', fr: 'Omra', ar: 'العمرة' },
  { key: 'Qods', fr: 'Qods (Al-Qods / Jérusalem)', ar: 'القدس' },
  { key: 'PaysVisites', fr: 'Pays visité(s)', ar: 'البلد/البلدان التي زرتها' },
]

const ASPECTS = [
  { key: 'orga', fr: 'Organisation impeccable', ar: 'تنظيم متقن' },
  { key: 'accueil', fr: 'Accueil chaleureux', ar: 'استقبال حار' },
  { key: 'conseils', fr: 'Conseils personnalisés', ar: 'نصائح شخصية' },
  { key: 'accomp', fr: 'Accompagnement sur place', ar: 'مرافقة في عين المكان' },
  { key: 'prix', fr: 'Bon rapport qualité-prix', ar: 'جودة بسعر مناسب' },
  { key: 'hotels', fr: 'Hôtels de qualité', ar: 'فنادق راقية' },
  { key: 'reactif', fr: 'Réactivité & disponibilité', ar: 'سرعة استجابة وتوفّر' },
  { key: 'programme', fr: 'Programme bien respecté', ar: 'احترام دقيق للبرنامج' },
]

// ---- Formulations (anti-duplication) ----
const INTROS = {
  fr: [
    'Je recommande vivement Voyages 21.',
    'Très belle expérience avec Voyages 21.',
    'Un grand merci à toute l’équipe de Voyages 21.',
    'Agence sérieuse, professionnelle et à l’écoute.',
    'Excellente agence de voyages, je suis ravi(e).',
    'Que du positif avec Voyages 21 !',
    'Une agence en qui on peut avoir confiance.',
    'Service impeccable du début à la fin avec Voyages 21.',
    'Je suis pleinement satisfait(e) de Voyages 21.',
    'Voyages 21, c’est du sérieux et du professionnalisme.',
    'Rien à redire, tout était parfait avec Voyages 21.',
    'Une expérience au top grâce à Voyages 21.',
    'Merci à Voyages 21 pour ce voyage réussi.',
    'Agence à recommander les yeux fermés.',
    'Accompagnement de qualité avec Voyages 21.',
    'Voyages 21 a dépassé nos attentes.',
    'Très bon suivi et grande disponibilité chez Voyages 21.',
  ],
  ar: [
    'أنصح بشدة بوكالة Voyages 21.',
    'تجربة رائعة مع Voyages 21.',
    'شكراً جزيلاً لكل فريق Voyages 21.',
    'وكالة جادة ومحترفة وقريبة من زبنائها.',
    'وكالة أسفار ممتازة، أنا في غاية الرضا.',
    'كل شيء كان إيجابياً مع Voyages 21!',
    'وكالة تستحق الثقة فعلاً.',
    'خدمة متقنة من البداية إلى النهاية مع Voyages 21.',
    'أنا راضٍ تماماً عن Voyages 21.',
    'Voyages 21 تعني الجدية والاحترافية.',
    'لا شيء يُعاب، كان كل شيء مثالياً مع Voyages 21.',
    'تجربة ممتازة بفضل Voyages 21.',
    'شكراً لـ Voyages 21 على هذه الرحلة الناجحة.',
    'وكالة أنصح بها دون تردد.',
    'مرافقة عالية الجودة مع Voyages 21.',
    'فاقت Voyages 21 توقعاتنا.',
    'متابعة جيدة جداً وتوفّر كبير لدى Voyages 21.',
  ],
}
const CLOTURES = {
  fr: [
    'À refaire sans hésiter !',
    'Je repartirai avec eux les yeux fermés.',
    'Merci encore pour tout.',
    'Je les recommande à 100 %.',
    'Une équipe de confiance.',
    'Vivement le prochain voyage avec eux !',
  ],
  ar: [
    'سأكررها دون تردد!',
    'سأسافر معهم مجدداً بكل ثقة.',
    'شكراً مرة أخرى على كل شيء.',
    'أنصح بهم بنسبة 100%.',
    'فريق يستحق الثقة.',
    'في انتظار الرحلة القادمة معهم!',
  ],
}

const MOIS = {
  fr: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
  ar: ['يناير', 'فبراير', 'مارس', 'أبريل', 'ماي', 'يونيو', 'يوليوز', 'غشت', 'شتنبر', 'أكتوبر', 'نونبر', 'دجنبر'],
}

function formatMois(ym, lang) {
  if (!ym) return ''
  const [y, m] = ym.split('-')
  const i = parseInt(m, 10) - 1
  if (isNaN(i) || !MOIS[lang][i]) return ''
  return `${MOIS[lang][i]} ${y}`
}

function contextePhrase(key, dm, lang, paysText) {
  const dateFr = dm ? ` en ${dm}` : ''
  const dateAr = dm ? ` في ${dm}` : ''
  if (lang === 'ar') {
    if (key === 'Hajj') return `بالنسبة لرحلة الحج${dateAr}، كان كل شيء منظماً بشكل مثالي.`
    if (key === 'Omra') return `بالنسبة لرحلة العمرة${dateAr}، كان كل شيء منظماً بشكل مثالي.`
    if (key === 'Qods') return `بالنسبة لزيارة القدس${dateAr}، كان كل شيء منظماً بشكل مثالي.`
    if (key === 'PaysVisites') {
      const list = (paysText || '').split(',').map((s) => s.trim()).filter(Boolean)
      if (list.length === 0) return `بالنسبة لرحلتنا${dateAr}، كان كل شيء منظماً بشكل مثالي.`
      if (list.length === 1) return `بالنسبة لرحلتنا (${list[0]})${dateAr}، كان كل شيء منظماً بشكل مثالي.`
      return `بالنسبة لرحلاتنا (${list.join('، ')})${dateAr}، كان كل شيء منظماً بشكل مثالي.`
    }
    return ''
  }
  if (key === 'Hajj') return `Pour notre Hajj${dateFr}, tout a été parfaitement organisé.`
  if (key === 'Omra') return `Pour notre Omra${dateFr}, tout a été parfaitement organisé.`
  if (key === 'Qods') return `Pour notre voyage à Al-Qods${dateFr}, tout a été parfaitement organisé.`
  if (key === 'PaysVisites') {
    const list = (paysText || '').split(',').map((s) => s.trim()).filter(Boolean)
    if (list.length === 0) return `Pour notre voyage${dateFr}, tout était parfaitement organisé.`
    if (list.length === 1) return `Pour notre voyage (${list[0]})${dateFr}, tout était parfaitement organisé.`
    return `Pour nos voyages (${list.join(', ')})${dateFr}, tout était parfaitement organisé.`
  }
  return ''
}

function nbPhrase(n, lang) {
  if (lang === 'ar') {
    if (n === 2) return 'سافرنا كزوجين.'
    if (n >= 3) return `سافرنا ${n} أشخاص.`
    return ''
  }
  if (n === 2) return 'Nous avons voyagé en couple.'
  if (n >= 3) return `Nous avons voyagé à ${n} personnes.`
  return ''
}

function genererAvis(lang, { sujet, pays, date, nbPersonnes, aspects, conseiller, note, seed }) {
  const pick = (arr) => arr[seed % arr.length]
  const parts = [pick(INTROS[lang])]

  const dm = formatMois(date, lang)
  const ctx = contextePhrase(sujet, dm, lang, pays)
  if (ctx) parts.push(ctx)

  const n = parseInt(nbPersonnes, 10)
  const nb = nbPhrase(n, lang)
  if (nb) parts.push(nb)

  if (aspects.length) {
    const labels = aspects
      .map((k) => {
        const a = ASPECTS.find((x) => x.key === k)
        return a ? a[lang] : ''
      })
      .filter(Boolean)
    if (labels.length) {
      if (lang === 'ar') {
        const joined =
          labels.length === 1
            ? labels[0]
            : `${labels.slice(0, -1).join('، ')} و${labels[labels.length - 1]}`
        parts.push(`أعجبني بشكل خاص: ${joined}.`)
      } else {
        const low = labels.map((s) => s.toLowerCase())
        const joined =
          low.length === 1 ? low[0] : `${low.slice(0, -1).join(', ')} et ${low[low.length - 1]}`
        parts.push(`J’ai particulièrement apprécié : ${joined}.`)
      }
    }
  }

  if (conseiller.trim()) {
    parts.push(
      lang === 'ar'
        ? `شكر خاص لـ${conseiller.trim()} على احترافيته ولطفه.`
        : `Un grand merci à ${conseiller.trim()} pour son professionnalisme et sa gentillesse.`
    )
  }

  if (note.trim()) parts.push(note.trim())

  parts.push(pick(CLOTURES[lang]))
  return parts.join(' ')
}

// ---- Textes d'interface bilingues (sans emoji) ----
const T = {
  fr: {
    titre: 'Aidez-nous à écrire votre avis',
    sous: 'Répondez en 30 secondes, on rédige le texte pour vous.',
    q1: '1. Votre avis concerne…',
    choisir: '— Choisissez —',
    q1pays: 'Quel(s) pays ? (séparez par des virgules si plusieurs)',
    q1paysPh: 'Ex. Maroc, Turquie, Égypte',
    q2: '2. Date du voyage',
    q3: '3. Nombre de personnes',
    q4: '4. Ce qui vous a marqué (cochez ce qui vous parle)',
    q5: '5. Le prénom de votre conseiller (facultatif)',
    q5ph: 'Ex. Karim, Wafa, Fouad…',
    motLabel: 'Un mot personnel (facultatif)',
    motPh: 'Ajoutez une touche personnelle, ça rend l’avis unique.',
    q6: '6. Une photo ou vidéo de votre voyage ? (facultatif)',
    consent: 'J’autorise Voyages 21 à utiliser ma photo / vidéo sur ses réseaux sociaux et supports de communication.',
    ajouter: 'Ajouter une photo / vidéo',
    cocheConsent: 'Cochez la case d’autorisation pour pouvoir envoyer votre fichier.',
    envoi: 'Envoi de',
    merciFichier: 'bien envoyé à l’agence.',
    rappelPhotoGoogle: 'Pensez aussi à ajouter cette photo à votre avis Google : dans la fenêtre Google, appuyez sur « Ajouter des photos ». Ça donne encore plus de poids à votre témoignage.',
    erreurUp: 'Envoi impossible. Réessayez ou envoyez-le par WhatsApp.',
    noteUp: 'Votre photo/vidéo est partagée avec l’agence pour ses réseaux. Sur Google, vous pouvez aussi ajouter vos photos directement dans votre avis.',
    votreAvis: 'Votre avis',
    autreForm: 'Autre formulation',
    rappel5: 'N’oubliez pas de mettre 5 étoiles sur Google.',
    copier: 'Copier mon avis',
    copie: 'Avis copié',
    valider: 'Copier et valider sur Google',
    instr: 'Sur Google : appuyez sur la case commentaire, faites appui long puis Coller, mettez 5 étoiles, ajoutez vos photos puis Publier. Merci.',
  },
  ar: {
    titre: 'ساعدنا في كتابة رأيك',
    sous: 'أجب في 30 ثانية، ونحن نكتب النص لك.',
    q1: '1. رأيك يخص…',
    choisir: '— اختر —',
    q1pays: 'أي بلد/بلدان؟ (افصل بينها بفواصل إن كانت متعددة)',
    q1paysPh: 'مثال: المغرب، تركيا، مصر',
    q2: '2. تاريخ الرحلة',
    q3: '3. عدد الأشخاص',
    q4: '4. ما الذي أعجبك (اختر ما يناسبك)',
    q5: '5. اسم مستشارك (اختياري)',
    q5ph: 'مثال: كريم، وفاء، فؤاد…',
    motLabel: 'كلمة شخصية (اختياري)',
    motPh: 'أضف لمسة شخصية، فهذا يجعل رأيك فريداً.',
    q6: '6. صورة أو فيديو من رحلتك؟ (اختياري)',
    consent: 'أسمح لـ Voyages 21 باستعمال صورتي / الفيديو على شبكاتها الاجتماعية ووسائل التواصل.',
    ajouter: 'إضافة صورة / فيديو',
    cocheConsent: 'فعّل خانة الإذن حتى تتمكن من إرسال ملفك.',
    envoi: 'جارٍ إرسال',
    merciFichier: 'تم إرساله إلى الوكالة.',
    rappelPhotoGoogle: 'لا تنسَ أيضاً إضافة هذه الصورة إلى رأيك على Google: في نافذة Google اضغط على «إضافة صور». هذا يعطي وزناً أكبر لشهادتك.',
    erreurUp: 'تعذّر الإرسال. أعد المحاولة أو أرسله عبر واتساب.',
    noteUp: 'تُشارَك صورتك/الفيديو مع الوكالة لشبكاتها. على Google يمكنك أيضاً إضافة صورك مباشرة في رأيك.',
    votreAvis: 'رأيك',
    autreForm: 'صياغة أخرى',
    rappel5: 'لا تنسَ وضع 5 نجوم على Google.',
    copier: 'نسخ رأيي',
    copie: 'تم نسخ الرأي',
    valider: 'انسخ وأكمل على Google',
    instr: 'على Google: اضغط على خانة التعليق، اضغط مطوّلاً ثم لصق، ضع 5 نجوم، أضف صورك ثم انشر. شكراً.',
  },
}

export default function AvisGuide() {
  const [lang, setLang] = useState('fr')
  const [sujet, setSujet] = useState('')
  const [pays, setPays] = useState('')
  const [date, setDate] = useState('')
  const [nbPersonnes, setNbPersonnes] = useState('')
  const [aspects, setAspects] = useState([])
  const [conseiller, setConseiller] = useState('')
  const [note, setNote] = useState('')
  const [seed, setSeed] = useState(0)
  const [copie, setCopie] = useState(false)

  const [consent, setConsent] = useState(false)
  const [upState, setUpState] = useState('idle')
  const [upName, setUpName] = useState('')

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 100000))
  }, [])

  const t = T[lang]
  const rtl = lang === 'ar'

  const avis = useMemo(
    () => genererAvis(lang, { sujet, pays, date, nbPersonnes, aspects, conseiller, note, seed }),
    [lang, sujet, pays, date, nbPersonnes, aspects, conseiller, note, seed]
  )

  const toggleAspect = (k) =>
    setAspects((p) => (p.includes(k) ? p.filter((x) => x !== k) : [...p, k]))

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
        clientPayload: JSON.stringify({ sujet, pays, date, nbPersonnes, avis, consent: true }),
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
  const langBtn = (on) => ({
    border: on ? '2px solid #1B3A28' : '1.5px solid #cdd5cd',
    background: on ? '#1B3A28' : '#fff',
    color: on ? '#fff' : '#2c3a31',
    borderRadius: 30,
    padding: '7px 16px',
    fontSize: 14.5,
    fontWeight: 700,
    cursor: 'pointer',
  })

  return (
    <div style={{ width: '100%', maxWidth: 560 }} dir={rtl ? 'rtl' : 'ltr'}>
      <header style={{ textAlign: 'center', marginBottom: 14 }}>
        <div style={{ color: '#C8A440', fontSize: 34, letterSpacing: 4 }}>★ ★ ★ ★ ★</div>
        <h1
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontStyle: rtl ? 'normal' : 'italic',
            fontSize: 30,
            color: '#1B3A28',
            margin: '6px 0 4px',
          }}
        >
          {t.titre}
        </h1>
      </header>

      {/* Sélecteur de langue sous le titre */}
      <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 14 }} dir="ltr">
        <button type="button" onClick={() => setLang('fr')} style={langBtn(lang === 'fr')}>
          Français
        </button>
        <button type="button" onClick={() => setLang('ar')} style={langBtn(lang === 'ar')}>
          العربية
        </button>
      </div>

      <p style={{ color: '#3a4a3f', fontSize: 15.5, margin: '0 0 22px', textAlign: 'center' }}>{t.sous}</p>

      {/* 1. Sujet */}
      <section style={card}>
        <label htmlFor="sujet" style={labelStyle}>{t.q1}</label>
        <select id="sujet" value={sujet} onChange={(e) => setSujet(e.target.value)} style={field}>
          <option value="">{t.choisir}</option>
          {SUJETS.map((o) => (
            <option key={o.key} value={o.key}>
              {o[lang]}
            </option>
          ))}
        </select>

        {sujet === 'PaysVisites' && (
          <div style={{ marginTop: 14 }}>
            <label htmlFor="pays" style={labelStyle}>{t.q1pays}</label>
            <input
              id="pays"
              value={pays}
              onChange={(e) => setPays(e.target.value)}
              placeholder={t.q1paysPh}
              style={field}
            />
          </div>
        )}
      </section>

      {/* 2. Date + nb */}
      <section style={card}>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 180px' }}>
            <label htmlFor="date" style={labelStyle}>{t.q2}</label>
            <input id="date" type="month" value={date} onChange={(e) => setDate(e.target.value)} style={field} />
          </div>
          <div style={{ flex: '1 1 140px' }}>
            <label htmlFor="nb" style={labelStyle}>{t.q3}</label>
            <input
              id="nb"
              type="number"
              min="1"
              inputMode="numeric"
              value={nbPersonnes}
              onChange={(e) => setNbPersonnes(e.target.value)}
              placeholder="4"
              style={field}
            />
          </div>
        </div>
      </section>

      {/* 4. Aspects */}
      <section style={card}>
        <span style={labelStyle}>{t.q4}</span>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9 }}>
          {ASPECTS.map((a) => {
            const on = aspects.includes(a.key)
            return (
              <button
                key={a.key}
                type="button"
                onClick={() => toggleAspect(a.key)}
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
                {a[lang]}
              </button>
            )
          })}
        </div>
      </section>

      {/* 5. Conseiller + mot */}
      <section style={card}>
        <label htmlFor="conseiller" style={labelStyle}>{t.q5}</label>
        <input
          id="conseiller"
          value={conseiller}
          onChange={(e) => setConseiller(e.target.value)}
          placeholder={t.q5ph}
          style={{ ...field, marginBottom: 16 }}
        />
        <label htmlFor="note" style={labelStyle}>{t.motLabel}</label>
        <textarea
          id="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder={t.motPh}
          rows={2}
          style={{ ...field, resize: 'vertical', fontFamily: 'inherit' }}
        />
      </section>

      {/* 6. Photo / vidéo */}
      <section style={card}>
        <span style={labelStyle}>{t.q6}</span>
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
          <span>{t.consent}</span>
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
          {t.ajouter}
        </label>
        <input id="fichier" type="file" accept="image/*,video/*" onChange={onFichier} disabled={!consent} style={{ display: 'none' }} />
        {!consent && <p style={{ fontSize: 13, color: '#a07b1e', margin: '8px 0 0' }}>{t.cocheConsent}</p>}
        {upState === 'loading' && (
          <p style={{ fontSize: 14, color: '#3a4a3f', margin: '10px 0 0' }}>{t.envoi} « {upName} »…</p>
        )}
        {upState === 'done' && (
          <div style={{ marginTop: 12, background: '#eef5ee', border: '1.5px solid #cfe0cf', borderRadius: 10, padding: 12 }}>
            <p style={{ fontSize: 14.5, color: '#1B3A28', fontWeight: 700, margin: 0 }}>« {upName} » — {t.merciFichier}</p>
            <p style={{ fontSize: 14, color: '#2c3a31', margin: '8px 0 0' }}>{t.rappelPhotoGoogle}</p>
          </div>
        )}
        {upState === 'error' && <p style={{ fontSize: 14, color: '#a23', margin: '10px 0 0' }}>{t.erreurUp}</p>}
        <p style={{ fontSize: 12.5, color: '#7a8a7f', margin: '8px 0 0' }}>{t.noteUp}</p>
      </section>

      {/* Aperçu */}
      <section style={{ ...card, background: '#F5F0E8' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <span style={labelStyle}>{t.votreAvis}</span>
          <button
            type="button"
            onClick={() => setSeed((s) => s + 1)}
            style={{ border: '1.5px solid #C8A440', background: '#fff', color: '#1B3A28', borderRadius: 30, padding: '6px 12px', fontSize: 13.5, cursor: 'pointer', fontWeight: 600 }}
          >
            {t.autreForm}
          </button>
        </div>
        <p style={{ fontSize: 17, lineHeight: 1.6, color: '#152E1F', background: '#fff', border: '1.5px solid #e3dcc9', borderRadius: 10, padding: 14, margin: 0, minHeight: 60 }}>
          {avis}
        </p>
      </section>

      {/* Rappel 5 étoiles */}
      <div style={{ background: '#FBF6E7', border: '2px solid #C8A440', borderRadius: 14, padding: '14px 16px', textAlign: 'center', marginBottom: 18 }}>
        <div style={{ fontSize: 30, letterSpacing: 4, color: '#C8A440' }}>★ ★ ★ ★ ★</div>
        <strong style={{ color: '#1B3A28', fontSize: 16 }}>{t.rappel5}</strong>
      </div>

      {/* Boutons */}
      <button
        type="button"
        onClick={copier}
        style={{ width: '100%', padding: '15px 18px', fontSize: 17, fontWeight: 700, borderRadius: 50, border: '2px solid #1B3A28', background: '#fff', color: '#1B3A28', cursor: 'pointer', marginBottom: 12 }}
      >
        {copie ? t.copie : t.copier}
      </button>
      <button
        type="button"
        onClick={copierEtOuvrir}
        style={{ width: '100%', padding: '17px 18px', fontSize: 18, fontWeight: 700, borderRadius: 50, border: '3px solid #C8A440', background: '#1B3A28', color: '#fff', cursor: 'pointer', boxShadow: '0 12px 30px rgba(27,58,40,.25)' }}
      >
        {t.valider}
      </button>

      <p style={{ fontSize: 14, color: '#3a4a3f', textAlign: 'center', marginTop: 14, lineHeight: 1.6 }}>{t.instr}</p>
    </div>
  )
}
