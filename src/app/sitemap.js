// sitemap.xml généré par Next.js (App Router).
// Combine deux sources :
//   1. les routes App Router publiques (liste explicite ci-dessous),
//   2. les pages destination statiques scannées dans public/voyages/*.html.
// Les espaces admin, l'espace client, le studio et les pages de redirection
// (ex. /avis) sont volontairement exclus.

import fs from 'node:fs'
import path from 'node:path'
import { lireCatalogue, programmesOmra } from '@/lib/omra-catalogue'

// Les pages /omra/<programme> suivent le catalogue de l'admin : le plan de site se
// construit à la demande, pas à la construction du site.
export const dynamic = 'force-dynamic'

const SITE_URL = 'https://www.voyages21.com'

// Routes App Router publiques, avec une priorité indicative.
const APP_ROUTES = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/about', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/faq', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/omra', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/mice', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/partenaires', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/marhaba', priority: 0.6, changeFrequency: 'weekly' },
  { path: '/chroniques', priority: 0.6, changeFrequency: 'weekly' },
  { path: '/en-images', priority: 0.5, changeFrequency: 'monthly' },
]

// Scanne récursivement public/voyages pour lister les pages destination statiques.
function listVoyagesPages() {
  const root = path.join(process.cwd(), 'public', 'voyages')
  const urls = []
  let entries
  try {
    entries = fs.readdirSync(root, { withFileTypes: true, recursive: true })
  } catch {
    return urls
  }
  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith('.html')) continue
    // parentPath (Node 20+) ou path (fallback) donne le dossier de l'entrée.
    const dir = entry.parentPath || entry.path || root
    const rel = path.relative(path.join(process.cwd(), 'public'), path.join(dir, entry.name))
    urls.push('/' + rel.split(path.sep).join('/'))
  }
  return urls
}

export default async function sitemap() {
  const now = new Date()

  const appEntries = APP_ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }))

  const voyagesEntries = listVoyagesPages().map((p) => ({
    url: `${SITE_URL}${p}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  // Une adresse par programme Omra de l'admin (09/11/2026) ; rien si le catalogue est injoignable.
  let omraEntries = []
  try {
    omraEntries = programmesOmra(await lireCatalogue()).map((p) => ({
      url: `${SITE_URL}/omra/${p.slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    }))
  } catch {
    omraEntries = []
  }

  return [...appEntries, ...voyagesEntries, ...omraEntries]
}
