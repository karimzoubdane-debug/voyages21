// Une Omra se range toujours sous « عمرة » (page Omra & Hajj), même si la destination
// choisie est « Arabie Saoudite » (Karim, 07/11/2026 : « à débloquer avec destination
// Omra, ce qui est logique »). Depuis que l'Arabie Saoudite a sa propre page, une Omra
// laissée sous ce nom partirait sur la page touristique au lieu de la page Omra.
//
// Appliqué à chaque enregistrement d'un voyage (création, lecture de PDF/Word,
// modification) : la fiche reste la même, seule sa destination est corrigée.

const OMRA = /عمرة|عمره|omra|umrah|hajj/i;

function estArabieSaoudite(nom) {
  return String(nom || '').trim().toLowerCase() === 'arabie saoudite';
}

export function rangerOmra(product) {
  if (!product || typeof product !== 'object') return product;
  const texte = [product.title, product.eyebrow].join(' ');
  if (!OMRA.test(texte) || !estArabieSaoudite(product.tag)) return product;
  product.tag = 'عمرة';
  if (Array.isArray(product.destinations)) {
    product.destinations = product.destinations.filter((d) => !estArabieSaoudite(d));
    if (!product.destinations.length) delete product.destinations;
  }
  return product;
}
