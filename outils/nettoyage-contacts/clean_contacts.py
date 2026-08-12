#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Nettoyage & organisation de la base clients Voyages21 (exports Google Contacts).
- Fusionne les fichiers sources, supprime les doublons exacts.
- Jette les lignes sans aucun moyen de contact (tel/email).
- Nettoie noms, découpe les numéros collés (:::), normalise les téléphones.
- Déduplique par téléphone (9 derniers chiffres) et par email.
- Sépare le "bruit" d'import (labels Importé le.../myContacts) du vrai groupe.
Produit un CSV propre + un CSV réimportable dans Google Contacts.
"""
import csv, re, sys, collections

SRC_MAIN  = sys.argv[1]
SRC_EXTRA = sys.argv[2]
OUT_CLEAN = sys.argv[3]   # base lisible (Excel/humain)
OUT_GOOGLE= sys.argv[4]   # réimport Google Contacts

def load(p):
    with open(p, newline='', encoding='utf-8') as f:
        return list(csv.DictReader(f))

def split_multi(v):
    """Découpe une cellule contenant plusieurs valeurs collées."""
    if not v: return []
    parts = re.split(r':::|\s/\s|\bou\b', v)
    return [p.strip() for p in parts if p.strip()]

def clean_phone(p):
    """Nettoie l'affichage d'un numéro sans deviner un pays."""
    p = p.strip()
    # garde +, chiffres, espaces
    p = re.sub(r'[^\d+]', '', p)
    if p.startswith('00'): p = '+' + p[2:]
    return p

def phone_key(p):
    d = re.sub(r'\D', '', p)
    return d[-9:] if len(d) >= 9 else (d or None)

def clean_name(s):
    s = s.strip()
    if not s: return ''
    # retire ponctuation/symboles en début
    s = re.sub(r'^[\s\.\-\?\*\(\)_/\\+#>«»"\'’]+', '', s).strip()
    # retire numéros purs comme "nom"
    if re.fullmatch(r'[\d\s+]+', s): return ''
    return s

def clean_email(e):
    e = e.strip().lower()
    return e if re.match(r'^[^@\s]+@[^@\s]+\.[^@\s]+$', e) else ''

def clean_labels(lbl):
    keep = []
    for l in re.split(r':::', lbl or ''):
        l = l.strip()
        if not l: continue
        if l == '* myContacts': continue
        if l.startswith('Importé le'): continue
        keep.append(l)
    return keep

# ---- Chargement + fusion ----
rows = load(SRC_MAIN) + load(SRC_EXTRA)

merged = {}          # clé -> enregistrement consolidé
order  = []

def get_phones(r):
    out = []
    for i in range(1, 6):
        for v in split_multi(r.get(f'Phone {i} - Value', '')):
            cp = clean_phone(v)
            if cp: out.append(cp)
    return out

def get_emails(r):
    out = []
    for i in range(1, 4):
        e = clean_email(r.get(f'E-mail {i} - Value', ''))
        if e: out.append(e)
    return out

kept = dropped_empty = 0
for r in rows:
    phones = get_phones(r)
    emails = get_emails(r)
    if not phones and not emails:
        dropped_empty += 1
        continue
    kept += 1
    fn = clean_name(r.get('First Name', ''))
    ln = clean_name(r.get('Last Name', ''))
    org = r.get('Organization Name', '').strip()
    labels = clean_labels(r.get('Labels', ''))
    notes = r.get('Notes', '').strip()

    # clé de fusion : 1er téléphone sinon 1er email
    key = phone_key(phones[0]) if phones else emails[0]
    if key not in merged:
        merged[key] = {'first': fn, 'last': ln, 'org': org,
                       'phones': [], 'pkeys': set(), 'emails': [],
                       'labels': set(), 'notes': set()}
        order.append(key)
    rec = merged[key]
    # complète le nom si vide
    if not rec['first'] and fn: rec['first'] = fn
    if not rec['last'] and ln: rec['last'] = ln
    if not rec['org'] and org: rec['org'] = org
    for p in phones:
        pk = phone_key(p)
        if pk not in rec['pkeys']:
            rec['pkeys'].add(pk); rec['phones'].append(p)
    for e in emails:
        if e not in rec['emails']: rec['emails'].append(e)
    for l in labels: rec['labels'].add(l)
    if notes: rec['notes'].add(notes)

# ---- Écriture base propre lisible ----
with open(OUT_CLEAN, 'w', newline='', encoding='utf-8-sig') as f:
    w = csv.writer(f)
    w.writerow(['Prénom','Nom','Nom complet','Organisation',
                'Téléphone 1','Téléphone 2','Téléphone 3',
                'Email 1','Email 2','Groupe(s)','Notes'])
    for k in order:
        r = merged[k]
        full = ' '.join(x for x in [r['first'], r['last']] if x).strip()
        ph = r['phones'] + ['','','']
        em = r['emails'] + ['','']
        w.writerow([r['first'], r['last'], full, r['org'],
                    ph[0], ph[1], ph[2], em[0], em[1],
                    ' ; '.join(sorted(r['labels'])),
                    ' | '.join(sorted(r['notes']))])

# ---- Écriture réimport Google Contacts ----
with open(OUT_GOOGLE, 'w', newline='', encoding='utf-8-sig') as f:
    w = csv.writer(f)
    w.writerow(['First Name','Last Name','Organization Name',
                'Phone 1 - Value','Phone 2 - Value','Phone 3 - Value',
                'E-mail 1 - Value','E-mail 2 - Value','Labels','Notes'])
    for k in order:
        r = merged[k]
        ph = r['phones'] + ['','','']
        em = r['emails'] + ['','']
        w.writerow([r['first'], r['last'], r['org'],
                    ph[0], ph[1], ph[2], em[0], em[1],
                    ' ::: '.join(sorted(r['labels'])),
                    ' | '.join(sorted(r['notes']))])

# ---- Rapport ----
tot = len(order)
with_name = sum(1 for k in order if merged[k]['first'] or merged[k]['last'])
with_email = sum(1 for k in order if merged[k]['emails'])
print(f"Lignes sources lues       : {len(rows)}")
print(f"Lignes vides supprimées   : {dropped_empty}")
print(f"Lignes exploitables       : {kept}")
print(f"Contacts après dédup      : {tot}")
print(f"  dont avec nom           : {with_name}")
print(f"  dont avec email         : {with_email}")
print(f"Doublons fusionnés        : {kept - tot}")
