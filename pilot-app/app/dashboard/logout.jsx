'use client'

export default function LogoutButton() {
  async function handleLogout() {
    const { createClient } = await import('../../lib/supabase/client')
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = '/login'
  }
  return (
    <button
      onClick={handleLogout}
      style={{ width: 'auto', margin: 0, padding: '8px 16px', fontSize: '.85rem' }}
    >
      Déconnexion
    </button>
  )
}
