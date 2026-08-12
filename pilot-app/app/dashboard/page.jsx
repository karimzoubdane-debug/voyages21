import { redirect } from 'next/navigation'
import { isConfigured } from '../../lib/config'
import { createClient } from '../../lib/supabase/server'
import LogoutButton from './logout'

export default async function Dashboard() {
  // Tant que Supabase n'est pas configuré, on montre l'écran de mise en route.
  if (!isConfigured) {
    return (
      <div className="center">
        <div className="card">
          <div className="logo">Voyages<b>21</b> Pilot</div>
          <div className="sub">Lot 0 · Fondations</div>
          <div className="warn">
            ✅ L'ossature de l'app est en ligne et <b>isolée du site</b>.<br />
            Prochaine étape : brancher la base Supabase (voir le README).
          </div>
        </div>
      </div>
    )
  }

  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  return (
    <div>
      <div className="topbar">
        <div className="logo">Voyages<b>21</b> Pilot</div>
        <LogoutButton />
      </div>
      <div className="wrap">
        <h1 style={{ fontSize: '1.4rem', color: 'var(--forest)' }}>
          Bienvenue 👋
        </h1>
        <p style={{ marginTop: 8, color: 'var(--muted)' }}>
          Connecté en tant que <b>{user.email}</b>. Base vide — les modules
          arrivent lot par lot (Contacts au Lot 1).
        </p>
      </div>
    </div>
  )
}
