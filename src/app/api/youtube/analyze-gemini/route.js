import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextResponse } from 'next/server'

const PROMPT = `Tu es un assistant expert en business et IA appliquee.
Analyse cette video YouTube et reponds UNIQUEMENT en francais avec exactement cette structure (respecte les ## titres) :

## SYNTHESE
Un paragraphe de 3-4 phrases resumant l essentiel de la video et son objectif principal.

## POINTS CLES
- Point 1
- Point 2
- Point 3
- Point 4
- Point 5

## PLAN D ACTION STEP BY STEP
Liste numerotee des etapes concretes et detaillees pour reproduire exactement ce qui est montre.
Chaque etape doit mentionner : l action precise, l outil utilise, la configuration ou le parametre important.
Exemple de format :
1. Creer un compte sur [outil] sur [url] — choisir le plan [nom] a [prix]
2. Configurer [parametre] en allant dans [menu] > [sous-menu] > activer [option]
3. Connecter [outil A] a [outil B] via [methode] en utilisant la cle API dans [endroit]
Minimum 5 etapes, maximum 12 etapes.

## OUTILS ET RESSOURCES
Liste de tous les outils, sites, applications mentionnes avec leur URL si disponible et leur cout (gratuit/payant/prix).
Format : Nom de l outil — description courte — URL — Gratuit/Prix

## FORMATIONS ET PRODUITS PAYANTS
Si le createur propose une formation, coaching, template ou produit payant : nom, prix, URL.
Si aucun : ecrire "Aucune formation detectee".

## PERTINENCE BUSINESS
Pour chacune des 5 activites ci-dessous, donne une note de 1 a 5 et une phrase d application concrete :
- Agence de voyages (circuits Maroc, raids 4x4, moto expedition) : [note/5] — [application concrete]
- Creation d applications web et mobiles : [note/5] — [application concrete]
- Automatismes et workflows IA : [note/5] — [application concrete]
- Hebergement touristique (riads, villas, maisons d hotes) : [note/5] — [application concrete]
- Animation et activites touristiques (quad, montgolfiere, excursions) : [note/5] — [application concrete]

## IMPACT ET EFFORT
Impact sur le chiffre d affaires (1=faible, 5=fort) : [note]
Facilite de mise en oeuvre (1=difficile, 5=facile) : [note]
Priorite recommandee : [Urgent / Important / A planifier / Optionnel]
Estimation du temps de mise en oeuvre : [duree]`

export async function POST(request) {
  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json({ error: 'GEMINI_API_KEY non configure dans .env.local' }, { status: 500 })
  }

  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Corps de requete invalide' }, { status: 400 })
  }

  const { videoUrl } = body
  if (!videoUrl) {
    return NextResponse.json({ error: 'videoUrl requis' }, { status: 400 })
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

    const result = await model.generateContent([
      { fileData: { fileUri: videoUrl } },
      { text: PROMPT },
    ])

    const text = result.response.text()

    // Parser les actions step by step pour les cases a cocher
    const actionsMatch = text.match(/## PLAN D ACTION STEP BY STEP\n([\s\S]*?)(?=\n## |$)/)
    const actionsRaw = actionsMatch ? actionsMatch[1] : ''
    const actions = actionsRaw
      .split('\n')
      .filter((l) => /^\d+\./.test(l.trim()))
      .map((l) => l.replace(/^\d+\.\s*/, '').trim())
      .filter((l) => l.length > 5)

    // Parser impact/effort
    const impactMatch = text.match(/Impact sur le chiffre d affaires[^:]*:\s*(\d)/)
    const effortMatch = text.match(/Facilite de mise en oeuvre[^:]*:\s*(\d)/)
    const prioriteMatch = text.match(/Priorite recommandee\s*:\s*([^\n]+)/)
    const tempsMatch = text.match(/Estimation du temps[^:]*:\s*([^\n]+)/)

    return NextResponse.json({
      analysis: text,
      parsedActions: actions,
      impact: impactMatch ? parseInt(impactMatch[1]) : null,
      effort: effortMatch ? parseInt(effortMatch[1]) : null,
      priorite: prioriteMatch ? prioriteMatch[1].trim() : null,
      temps: tempsMatch ? tempsMatch[1].trim() : null,
    })
  } catch (err) {
    console.error('Gemini error:', err.message)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
