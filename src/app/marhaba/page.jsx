export const metadata = {
  title: 'Marhaba — Voyages21',
  description: 'Depuis 2000, Voyages 21 s\'impose comme une référence pour les professionnels du voyage en quête de rigueur et d\'authenticité.',
}

export default function MarhabaPage() {
  return (
    <main style={{ paddingTop: '100px', minHeight: '60vh', background: 'var(--light-gray)' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '4rem 2rem' }}>
        <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem' }}>
          Qui sommes-nous
        </p>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem,4vw,3.2rem)', color: 'var(--navy)', marginBottom: '2rem', lineHeight: 1.15 }}>
          Marhaba
        </h1>
        <div style={{ fontSize: '1rem', color: 'var(--gray)', lineHeight: 1.85, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <p>
            Bienvenue chez votre partenaire expert au Maroc. Depuis 2000, Voyages 21 s'impose comme une référence pour les professionnels du voyage en quête de rigueur et d'authenticité. Fondée par des lauréats de prestigieux instituts de tourisme, notre agence conjugue expertise académique et parfaite maîtrise du terrain.
          </p>
          <p>
            Nous concevons pour vos clients des séjours « cousus main », où chaque détail logistique est maîtrisé pour offrir une fluidité totale. Notre mission est simple : transformer la richesse culturelle et géographique du Maroc en un produit touristique d'exception, fiable et parfaitement exécuté.
          </p>
        </div>

        <div id="signature" style={{ marginTop: '4rem', paddingTop: '3rem', borderTop: '2px solid var(--gold)' }}>
          <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem' }}>
            Notre Expertise
          </p>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: 'var(--navy)', marginBottom: '2rem', lineHeight: 1.2 }}>
            Un voyage entre prestige et aventure.
          </h2>
          <div style={{ fontSize: '1rem', color: 'var(--gray)', lineHeight: 1.85, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <p>
              Notre signature repose sur notre capacité à gérer des projets complexes, du MICE de grande envergure (jusqu'à 400 participants) aux expéditions techniques les plus exigeantes.
            </p>
            <p>
              <strong style={{ color: 'var(--navy)' }}>L'expertise Rallye 4x4 :</strong> Spécialistes du hors-piste, nous organisons 2 à 3 fois par an les expéditions d'Étienne Smulevici, surnommé « l'inoxydable pilote du désert ». Recordman absolu du Rallye Dakar avec 40 participations et 27 arrivées, Étienne nous confie la logistique de ses parcours depuis plus de 20 ans.
            </p>
            <p>
              <strong style={{ color: 'var(--navy)' }}>Savoir-faire :</strong> Que vous soyez un professionnel du voyage ou un voyageur en quête d'évasion, notre promesse reste la même : une maîtrise totale de chaque détail. Nous mettons à votre disposition notre réseau exclusif de partenaires, sélectionnés avec une rigueur absolue depuis plus de 25 ans.
            </p>
            <p>
              <strong style={{ color: 'var(--navy)' }}>Approche Durable :</strong> Nous privilégions des expériences locales authentiques qui valorisent le patrimoine marocain tout en assurant une pérennité économique pour les communautés locales.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
