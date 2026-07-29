// sitemap.xml généré par Next.js (App Router).
// Combine deux sources :
//   1. les routes App Router publiques (liste explicite ci-dessous),
//   2. les pages destination statiques scannées dans public/voyages/*.html.
// Les espaces admin, l'espace client, le studio et les pages de redirection
// (ex. /avis) sont volontairement exclus.

import fs from 'node:fs'
import path from 'node:path'

const SITE_URL = 'https://www.voyages21.com'

// Routes App Router publiques, avec une priorité indicative.
const APP_ROUTES = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/about', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/faq', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/mice', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/partenaires', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/marhaba', priority: 0.6, changeFrequency: 'weekly' },
  { path: '/chroniques', priority: 0.6, changeFrequency: 'weekly' },
  { path: '/en-images', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/experiences', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/experiences/circuits-autotours', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/experiences/moto-expeditions', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/experiences/rallyes-4x4', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/circuits/classiques', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/circuits/moto', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/circuits/raid-4x4', priority: 0.8, changeFrequency: 'monthly' },
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

export default function sitemap() {
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

  return [...appEntries, ...voyagesEntries]
}
