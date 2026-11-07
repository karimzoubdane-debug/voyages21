// Texte d'un document RTF (« Texte enrichi », que Word sait enregistrer) — sans dépendance.
// On parcourt les groupes { } et les mots de commande : \par et \line → retour à la
// ligne, \tab → tabulation, \cell → « | », \'hh → caractère de la page de codes du
// document (\ansicpgN, ex. 1256 pour l'arabe), \uN → caractère Unicode (suivi de \ucN
// caractère(s) de repli ignorés). Les groupes d'en-tête (polices, couleurs, styles,
// images, infos…) et les groupes {\* …} sont ignorés.
const IGNORES = new Set(['fonttbl', 'colortbl', 'stylesheet', 'info', 'pict', 'header', 'footer', 'headerl', 'headerr', 'footerl', 'footerr',
  'listtable', 'listoverridetable', 'rsidtbl', 'xmlnstbl', 'generator', 'themedata', 'colorschememapping', 'latentstyles', 'datastore', 'object', 'fldinst', 'filetbl', 'revtbl']);

export function rtfText(buf) {
  const s = buf.toString('latin1');
  if (!s.startsWith('{\\rtf')) throw new Error('ce fichier n\'est pas un document RTF');
  let cp = 'windows-1252';
  const m = s.match(/\\ansicpg(\d+)/);
  if (m) cp = 'windows-' + m[1];
  let dec;
  try { dec = new TextDecoder(cp); } catch { dec = new TextDecoder('windows-1252'); }
  const out = [];
  const pile = [];
  let ignore = false, uc = 1, sauter = 0, octets = [];
  const vider = () => { if (octets.length) { out.push(dec.decode(Uint8Array.from(octets))); octets = []; } };
  const texte = (t) => { if (ignore) return; if (sauter > 0) { const n = Math.min(sauter, t.length); sauter -= n; t = t.slice(n); } if (t) { vider(); out.push(t); } };
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c === '{') { pile.push({ ignore, uc }); if (s[i + 1] === '\\' && s[i + 2] === '*') ignore = true; continue; }
    if (c === '}') { vider(); const p = pile.pop() || { ignore: false, uc: 1 }; ignore = p.ignore; uc = p.uc; continue; }
    if (c === '\\') {
      const n = s[i + 1];
      if (n === "'") { const h = parseInt(s.substr(i + 2, 2), 16); i += 3; if (ignore) continue; if (sauter > 0) { sauter--; continue; } if (!isNaN(h)) octets.push(h); continue; }
      if (n === '\\' || n === '{' || n === '}') { texte(n); i++; continue; }
      if (n === '~') { texte(' '); i++; continue; }
      if (n === '-' || n === '_') { i++; continue; }
      if (n === '\n' || n === '\r') { texte('\n'); i++; continue; }
      const mm = /^([a-zA-Z]+)(-?\d+)? ?/.exec(s.slice(i + 1, i + 40));
      if (!mm) { i++; continue; }
      i += mm[0].length;
      const mot = mm[1], arg = mm[2] !== undefined ? parseInt(mm[2], 10) : null;
      if (IGNORES.has(mot)) { ignore = true; continue; }
      if (ignore) continue;
      if (mot === 'par' || mot === 'line' || mot === 'row') texte('\n');
      else if (mot === 'tab') texte('\t');
      else if (mot === 'cell') texte(' | ');
      else if (mot === 'uc' && arg !== null) uc = arg;
      else if (mot === 'u' && arg !== null) { vider(); out.push(String.fromCharCode(arg < 0 ? arg + 65536 : arg)); sauter = uc; }
      continue;
    }
    if (c === '\r' || c === '\n') continue;
    texte(c);
  }
  vider();
  return out.join('')
    .replace(/ \| \n/g, '\n')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}
