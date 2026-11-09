import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  lireCatalogue, programmeOmra, titreFr, descriptionFr, datesFr, compagnie, villeDepart,
  prixFr, prefixePrix, prixMinimal, whatsappUrl, AGENCE,
} from '@/lib/omra-catalogue';
import s from '../omra.module.css';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = programmeOmra(await lireCatalogue(), slug);
  if (!p) return { title: 'Programme introuvable — Voyages21' };
  return {
    title: `${titreFr(p.produit)} — Voyages21, agence de voyages à Marrakech`,
    description: descriptionFr(p.produit),
    alternates: { canonical: `/omra/${slug}` },
  };
}

function Liste({ items, titre }) {
  if (!Array.isArray(items) || !items.length) return null;
  return (
    <div className={s.ar} lang="ar" dir="rtl">
      <h3>{titre}</h3>
      <ul>{items.map((x, i) => <li key={i}>{String(x)}</li>)}</ul>
    </div>
  );
}

export default async function OmraProgramme({ params }) {
  const { slug } = await params;
  const p = programmeOmra(await lireCatalogue(), slug);
  if (!p) notFound();
  const v = p.produit;
  const dates = datesFr(v);
  const c = compagnie(v);
  const ville = villeDepart(v);
  const prix = prixFr(v);
  const min = prixMinimal(v);
  const grille = v.priceTable && Array.isArray(v.priceTable.rows) ? v.priceTable : null;
  const wa = whatsappUrl(v, `Bonjour, je souhaite des informations sur le programme ${titreFr(v)} (voyages21.com/omra/${slug}).`);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: titreFr(v),
    description: descriptionFr(v),
    url: `https://www.voyages21.com/omra/${slug}`,
    inLanguage: 'ar',
    provider: { '@type': 'TravelAgency', name: 'Voyages21', url: 'https://www.voyages21.com', address: { '@type': 'PostalAddress', addressLocality: 'Marrakech', addressCountry: 'MA' } },
    ...(Array.isArray(v.route) && v.route.length ? { itinerary: { '@type': 'ItemList', itemListElement: v.route.map((r, i) => ({ '@type': 'ListItem', position: i + 1, name: String(r) })) } } : {}),
    ...(min && !p.solde ? { offers: { '@type': 'Offer', price: String(min), priceCurrency: 'MAD', availability: 'https://schema.org/InStock', url: `https://www.voyages21.com/omra/${slug}` } } : {}),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className={s.hero}>
        <div className={s.wrap}>
          <p className={s.eyebrow}>Omra · Voyages21 · Marrakech</p>
          <h1>{titreFr(v)}</h1>
          <p>{descriptionFr(v)}</p>
        </div>
      </section>
      <section className={`${s.wrap} ${s.section}`}>
        <ul className={s.faits}>
          {dates.length ? <li className={s.fait}><b>Dates</b>{dates.map((d, i) => <div key={i}>{d}</div>)}</li> : null}
          {ville ? <li className={s.fait}><b>Départ</b>{ville}</li> : null}
          {c ? <li className={s.fait}><b>Compagnie</b>{c}</li> : null}
          {prix ? <li className={s.fait}><b>Prix</b>{prefixePrix(v) ? prefixePrix(v) + ' ' : ''}{prix}{p.solde ? ' — programme passé' : ''}</li> : null}
        </ul>

        <div className={s.ar} lang="ar" dir="rtl">
          {v.eyebrow ? <p className={s.eyebrow} style={{ color: 'var(--olive-mid)' }}>{v.eyebrow}</p> : null}
          <h2>{v.title}</h2>
          {(Array.isArray(v.intro) ? v.intro : [v.intro]).filter(Boolean).map((t, i) => <p key={i}>{String(t)}</p>)}
        </div>
        <Liste items={v.highlights} titre="مميزات الرحلة" />
        <Liste items={v.programme} titre="البرنامج" />
        <Liste items={v.datesList} titre="التواريخ" />
        {Array.isArray(v.route) && v.route.length ? <p className={s.ar} lang="ar" dir="rtl"><b>المسار :</b> {v.route.join(' ← ')}</p> : null}
        <Liste items={v.inclus} titre="الثمن يشمل" />
        <Liste items={v.exclus} titre="الثمن لا يشمل" />

        {grille ? (
          <div className={s.ar} lang="ar" dir="rtl">
            <h3>الفنادق والأثمنة{grille.currency ? ` (${grille.currency})` : ''}</h3>
            <div className={s.tableWrap}>
              <table className={s.table}>
                <thead>
                  <tr>
                    <th>{(grille.medina && grille.medina.label) || 'المدينة المنورة'}</th>
                    <th>{(grille.mecca && grille.mecca.label) || 'مكة المكرمة'}</th>
                    {(grille.columns || []).map((col, i) => <th key={i}>{String(col)}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {grille.rows.map((r, i) => (
                    <tr key={i}>
                      <td>{r.medinaHotel ? r.medinaHotel.name : ''}</td>
                      <td>{r.meccaHotel ? r.meccaHotel.name : ''}</td>
                      {(r.prices || []).map((x, j) => <td key={j}>{String(x)}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}

        {v.dates && v.dates.note ? <p className={`${s.ar} ${s.note}`} lang="ar" dir="rtl">{String(v.dates.note)}</p> : null}
        {v.cta && (v.cta.title || v.cta.text) ? (
          <div className={s.ar} lang="ar" dir="rtl">
            {v.cta.title ? <h3>{v.cta.title}</h3> : null}
            {v.cta.text ? <p>{v.cta.text}</p> : null}
          </div>
        ) : null}

        <div className={s.actions}>
          {wa ? <a className={s.btnWa} href={wa} target="_blank" rel="noopener noreferrer">WhatsApp · Demander ce programme</a> : null}
          <a className={s.btn} href={`/voyages/voyage-admin.html?slug=${encodeURIComponent(slug)}`}>La fiche avec les photos</a>
          <Link className={s.btn} href="/omra">Tous les programmes Omra</Link>
        </div>
        <p className={s.note} style={{ marginTop: '2rem' }}>{AGENCE}. Les dates, les hôtels et les prix sont ceux publiés par l&apos;agence pour ce programme ; ils sont confirmés à la réservation.</p>
      </section>
    </>
  );
}
