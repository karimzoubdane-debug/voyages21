import { redirect } from 'next/navigation'

// Lien court à envoyer aux clients (WhatsApp, mail, carte de visite, QR code) :
//   https://www.voyages21.com/avis
// → redirige directement vers la fenêtre « Laisser un avis » de la fiche
//   Google Business de Voyages21 (étoiles prêtes à cliquer).
// Si un jour le lien Google change, il suffit de modifier l'URL ci-dessous.
const GOOGLE_AVIS_URL =
  'https://search.google.com/local/writereview?placeid=ChIJPaMFhYzurw0R50-J4mRz7oc'

export default function AvisPage() {
  redirect(GOOGLE_AVIS_URL)
}
