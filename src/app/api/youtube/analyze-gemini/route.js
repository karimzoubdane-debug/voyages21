import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextResponse } from 'next/server'

const PROMPT = `Tu es un assistant expert en business et IA appliquee.
Analyse cette video YouTube et reponds en francais avec la structure suivante :

## SYNTHESE
Un paragraphe de 3-4 phrases resument l essentiel de la video.

## POINTS CLES
Liste des 5 points les plus importants retenus de la video.

## ACTIONS TECHNIQUES
Les etapes concretes pour reproduire ce qui est montre (outils, configurations, abonnements).

## LIENS ET RESSOURCES MENTIONNES
Tous les outils, sites, liens cites dans la video avec une courte description.

## FORMATIONS PROPOSEES
Si le createur propose une formation, un coaching ou un produit payant, indique le nom et le prix.

## PERTINENCE BUSINESS
Pour chacune de ces 5 activites, dis en 1-2 phrases comment cette video peut etre utile :
- Agence de voyages (circuits Maroc, raids 4x4, moto expedition)
- Creation d applications web et mobiles
- Automatismes et workflows IA
- Hebergement touristique (riads, villas, maisons d hotes)
- Animation et activites touristiques (quad, montgolfiere, excursions)

Sois precis, concret et actionnable.`

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
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' })

    const result = await model.generateContent([
      {
        fileData: {
          fileUri: videoUrl,
        },
      },
      { text: PROMPT },
    ])

    const text = result.response.text()
    return NextResponse.json({ analysis: text })
  } catch (err) {
    console.error('Gemini error:', err.message)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
