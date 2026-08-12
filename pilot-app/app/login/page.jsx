'use client'

import { useState } from 'react'
import { isConfigured } from '../../lib/config'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { createClient } = await import('../../lib/supabase/client')
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: `${window.location.origin}/dashboard` },
      })
      if (error) setError(error.message)
      else setSent(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="center">
      <div className="card">
        <div className="logo">Voyages<b>21</b></div>
        <div className="sub">Pilot · Connexion</div>

        {!isConfigured ? (
          <div className="warn">
            ⚙️ Configuration requise : ajoute tes clés Supabase dans les
            variables d'environnement (<code>NEXT_PUBLIC_SUPABASE_URL</code> et
            <code> NEXT_PUBLIC_SUPABASE_ANON_KEY</code>) pour activer la connexion.
          </div>
        ) : sent ? (
          <div className="msg">
            ✅ Lien de connexion envoyé à <b>{email}</b>.<br />
            Ouvre ta boîte mail et clique le lien pour entrer.
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <label>Ton adresse e-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="karimzoubdane@gmail.com"
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Envoi…' : 'Recevoir mon lien de connexion'}
            </button>
            {error && <div className="msg" style={{ color: '#c0504d' }}>{error}</div>}
          </form>
        )}
      </div>
    </div>
  )
}
