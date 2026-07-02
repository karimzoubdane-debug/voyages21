import { redirect } from 'next/navigation'

// Racine → on envoie vers le tableau de bord (protégé par le middleware).
export default function Home() {
  redirect('/dashboard')
}
