// Alerte e-mail « nouvel avis à valider », envoyée à Karim via Resend.
// Simple appel REST, aucune dépendance. Si Resend n'est pas configuré, la fonction
// ne bloque rien : elle renvoie { sent:false } et le pipeline continue (l'avis
// reste visible dans la mini-app de validation).
//
// Variables d'environnement :
//   RESEND_API_KEY     — clé API Resend (si absente : e-mail désactivé)
//   REVIEW_ALERT_TO    — destinataire (défaut : karimzoubdane@gmail.com)
//   REVIEW_ALERT_FROM  — expéditeur vérifié chez Resend (défaut : onboarding@resend.dev)
//   NEXT_PUBLIC_SITE_URL — base des liens (défaut : https://www.voyages21.com)

const RESEND_ENDPOINT = 'https://api.resend.com/emails';

export function isEmailConfigured() {
  return !!process.env.RESEND_API_KEY;
}

function siteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.voyages21.com').replace(/\/$/, '');
}

export function validationUrl() {
  return `${siteUrl()}/admin/avis-google`;
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function stars(n) {
  const full = Math.max(0, Math.min(5, n || 0));
  return '★'.repeat(full) + '☆'.repeat(5 - full);
}

// Envoie une alerte récapitulant 1..N nouveaux avis avec leur proposition de réponse.
export async function sendReviewAlert(newReviews) {
  if (!isEmailConfigured() || !newReviews?.length) {
    return { sent: false };
  }
  const to = process.env.REVIEW_ALERT_TO || 'karimzoubdane@gmail.com';
  const from = process.env.REVIEW_ALERT_FROM || 'Voyages21 <onboarding@resend.dev>';
  const link = validationUrl();

  const blocks = newReviews
    .map((r) => {
      return `
        <div style="border:1px solid #e6ddcc;border-radius:12px;padding:16px;margin:0 0 14px;">
          <div style="font-weight:700;color:#1B3A28;">${escapeHtml(r.reviewerName)}
            <span style="color:#C8A440;font-weight:400;"> &nbsp;${stars(r.rating)}</span>
          </div>
          <div style="color:#4b463d;font-size:14px;margin:6px 0 10px;white-space:pre-wrap;">${escapeHtml(r.comment) || '<em>(avis sans texte)</em>'}</div>
          <div style="font-size:12px;color:#8a8272;text-transform:uppercase;letter-spacing:.08em;">Proposition de réponse</div>
          <div style="background:#F5F0E8;border-radius:8px;padding:12px;margin-top:6px;color:#23211c;font-size:14px;white-space:pre-wrap;">${escapeHtml(r.proposedReply)}</div>
        </div>`;
    })
    .join('');

  const count = newReviews.length;
  const subject =
    count === 1
      ? `Nouvel avis Google à valider — ${newReviews[0].reviewerName} (${newReviews[0].rating || '?'}/5)`
      : `${count} nouveaux avis Google à valider`;

  const html = `
    <div style="font-family:'DM Sans',Arial,sans-serif;max-width:620px;margin:0 auto;">
      <div style="background:#1B3A28;color:#F5F0E8;padding:18px 22px;border-radius:12px 12px 0 0;">
        <div style="color:#C8A440;letter-spacing:.12em;font-size:12px;font-weight:700;">VOYAGES 21</div>
        <div style="font-size:18px;font-weight:700;margin-top:4px;">${count === 1 ? 'Un nouvel avis Google' : count + ' nouveaux avis Google'} à valider</div>
      </div>
      <div style="padding:20px 22px;background:#fff;border:1px solid #e6ddcc;border-top:0;border-radius:0 0 12px 12px;">
        ${blocks}
        <a href="${link}" style="display:inline-block;background:#1B3A28;color:#fff;text-decoration:none;padding:12px 22px;border-radius:999px;font-weight:700;margin-top:6px;">Valider mes réponses →</a>
        <p style="color:#8a8272;font-size:12px;margin-top:16px;">Rien n'est publié sur Google tant que vous ne l'avez pas validé depuis votre espace.</p>
      </div>
    </div>`;

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({ from, to: [to], subject, html }),
      cache: 'no-store',
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      return { sent: false, error: err?.message || `HTTP ${res.status}` };
    }
    return { sent: true };
  } catch (e) {
    return { sent: false, error: e.message };
  }
}
