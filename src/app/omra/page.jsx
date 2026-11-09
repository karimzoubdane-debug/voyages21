import Link from 'next/link';
import { lireCatalogue, programmesOmra, titreFr, datesFr, compagnie, prixFr, prefixePrix, AGENCE } from '@/lib/omra-catalogue';
import s from './omra.module.css';

// Le catalogue vit dans l'admin : la page se construit à chaque visite, jamais figée.
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Omra depuis le Maroc 2026-2027 : programmes, dates et prix — Voyages21 Marrakech',
  description: 'Les programmes Omra de Voyages21 au départ du Maroc : dates, compagnies, hôtels à Médine et à La Mecque, prix en dirhams. ' + AGENCE + '.',
  alternates: { canonical: '/omra' },
};

export default async function OmraIndex() {
  const programmes = programmesOmra(await lireCatalogue());
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Programmes Omra — Voyages21',
    itemListElement: programmes.map((p, i) => ({
      '@type': 'ListItem', position: i + 1, name: titreFr(p.produit), url: `https://www.voyages21.com/omra/${p.slug}`,
    })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className={s.hero}>
        <div className={s.wrap}>
          <p className={s.eyebrow}>Omra · Hajj · Voyages21</p>
          <h1>Omra depuis le Maroc : nos programmes 2026-2027</h1>
          <p>Chaque programme donne ses dates, sa compagnie, ses hôtels à Médine et à La Mecque et ses prix en dirhams. {AGENCE}.</p>
        </div>
      </section>
      <section className={`${s.wrap} ${s.section}`}>
        {programmes.length ? (
          <ul className={s.cards}>
            {programmes.map((p) => {
              const v = p.produit;
              const dates = datesFr(v);
              const c = compagnie(v);
              const prix = prixFr(v);
              return (
                <li key={p.slug} className={s.card}>
                  {p.solde ? <span className={s.badge}>Programme passé</span> : null}
                  <h3><Link href={`/omra/${p.slug}`} className={s.lien}>{titreFr(v)}</Link></h3>
                  <p className={s.ar} lang="ar" dir="rtl">{v.eyebrow || v.title}</p>
                  {dates.length ? <p className={s.meta}>{dates.join(' · ')}</p> : null}
                  {c ? <p className={s.meta}>Vols : {c}</p> : null}
                  {prix ? <p className={s.prix}>{prefixePrix(v) ? prefixePrix(v) + ' ' : ''}{prix}</p> : null}
                  <Link href={`/omra/${p.slug}`} className={s.lien}>Voir le programme ›</Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className={s.vide}>Les programmes Omra sont momentanément indisponibles. Retrouvez-les sur la page <a href="/voyages/destinations/omra.html">Omra &amp; Hajj</a>.</p>
        )}
        <div className={s.actions}>
          <a className={s.btn} href="/voyages/destinations/omra.html">La page Omra &amp; Hajj</a>
          <a className={s.btn} href="/voyages/destinations/hajj-2027.html">Le Hajj 2027</a>
        </div>
      </section>
    </>
  );
}
