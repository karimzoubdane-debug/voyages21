import zlib from 'node:zlib';

// Texte d'un document Word (.docx) — sans dépendance : un .docx est une archive ZIP dont
// le texte est dans word/document.xml. On lit le répertoire de l'archive, on décompresse
// ce fichier, puis on garde le texte (paragraphes, tableaux, tabulations).
// Les anciens fichiers .doc (format binaire) ne sont pas lisibles ainsi.
function entree(buf, nom) {
  let eocd = -1;
  for (let i = buf.length - 22; i >= Math.max(0, buf.length - 65557); i--) {
    if (buf.readUInt32LE(i) === 0x06054b50) { eocd = i; break; }
  }
  if (eocd < 0) throw new Error('ce fichier n\'est pas un document Word (.docx)');
  const total = buf.readUInt16LE(eocd + 10);
  let p = buf.readUInt32LE(eocd + 16);
  for (let n = 0; n < total; n++) {
    if (buf.readUInt32LE(p) !== 0x02014b50) break;
    const methode = buf.readUInt16LE(p + 10);
    const taille = buf.readUInt32LE(p + 20);
    const lNom = buf.readUInt16LE(p + 28), lExtra = buf.readUInt16LE(p + 30), lCom = buf.readUInt16LE(p + 32);
    const local = buf.readUInt32LE(p + 42);
    const nomFichier = buf.toString('utf8', p + 46, p + 46 + lNom);
    if (nomFichier === nom) {
      const debut = local + 30 + buf.readUInt16LE(local + 26) + buf.readUInt16LE(local + 28);
      const data = buf.subarray(debut, debut + taille);
      if (methode === 0) return data;
      if (methode === 8) return zlib.inflateRawSync(data);
      throw new Error('compression non prise en charge (' + methode + ')');
    }
    p += 46 + lNom + lExtra + lCom;
  }
  throw new Error('texte du document introuvable');
}

export function docxText(buf) {
  const xml = entree(buf, 'word/document.xml').toString('utf8');
  return xml
    .replace(/<w:tab\/>/g, '\t')
    .replace(/<w:(br|cr)\/>/g, '\n')
    .replace(/<\/w:p>\s*<\/w:tc>/g, ' | ')
    .replace(/<\/w:tc>/g, ' | ')
    .replace(/ \| <\/w:tr>/g, '</w:tr>')
    .replace(/<\/w:(p|tr)>/g, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (m, d) => String.fromCodePoint(+d))
    .replace(/&#x([0-9a-f]+);/gi, (m, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&amp;/g, '&')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}
