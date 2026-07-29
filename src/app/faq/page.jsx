import FaqClient from './FaqClient'
import { faqs } from './faqData'

export const metadata = {
  title: 'FAQ — Questions fréquentes — Voyages21',
  description: 'Toutes les réponses à vos questions sur les circuits Maroc, la logistique, les paiements, les annulations et nos services MICE. Voyages21, DMC Marrakech.',
  alternates: { canonical: '/faq' },
}

// Données structurées Schema.org FAQPage : reprend les mêmes questions/réponses
// que l'accordéon, afin que Google puisse afficher les questions en résultat enrichi.
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.flatMap((section) =>
    section.questions.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.r,
      },
    }))
  ),
}

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <FaqClient />
    </>
  )
}
