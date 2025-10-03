import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext.jsx'
import { Navigate, useLocation } from 'react-router-dom'
import { passwordUtils } from '../utils/passwordUtils.js'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { login, isAuthenticated, loading, error } = useAuth()
  const location = useLocation()

  // Redirigir si ya está autenticado
  const from = location.state?.from?.pathname || '/'

  if (isAuthenticated) {
    return <Navigate to={from} replace />
  }

  const handleTraditionalLogin = async (e) => {
    e.preventDefault()
    if (!username.trim() || !password.trim()) {
      return
    }

    // Hashear la contraseña con SHA256 antes de enviarla
    const hashedPassword = await passwordUtils.hashPassword(password)

    const result = await login({ username, password: hashedPassword })
    if (result.success) {
    }
  }

  if (loading) {
    return (
      <div className="card" style={{ textAlign: 'center' }}>
        <p>Verificando autenticación...</p>
      </div>
    )
  }

  return (
    <div className="card">
      <h2 style={{ marginTop: 0 }}>Iniciar Sesión</h2>

      <form onSubmit={handleTraditionalLogin}>
        <div className="grid cols-2">
          <div>
            <label>Usuario</label>
            <input
              className="input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Contraseña</label>
            <input
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        {error && <p style={{ color: '#ef4444', margin: '1rem 0' }}>{error}</p>}
        <button
          type="submit"
          className="btn primary"
          disabled={loading}
          style={{ width: '100%', marginTop: '1rem' }}
        >
          {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
        </button>
      </form>

      {/* Credenciales de prueba para el modo mock */}
      {import.meta.env.VITE_USE_MOCK === 'true' && (
        <div
          style={{
            marginTop: '2rem',
            padding: '1rem',
            backgroundColor: '#111827',
            borderRadius: '6px',
            fontSize: '0.875rem',
          }}
        >
          <p style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold' }}>Credenciales de prueba:</p>
          <p style={{ margin: '0' }}>
            <code>cristian</code> | <code>cristian</code> (Usuario)
          </p>
          <p style={{ margin: '0.25rem 0 0 0' }}>
            <code>angel</code> | <code>angel</code> (Usuario)
          </p>
          <p style={{ margin: '0.25rem 0 0 0' }}>
            <code>santiago</code> | <code>santiago</code> (Usuario)
          </p>
          <p style={{ margin: '0.25rem 0 0 0' }}>
            <code>angie</code> | <code>angie</code> (Usuario)
          </p>
          <p style={{ margin: '0.25rem 0 0 0' }}>
            <code>felipe</code> | <code>felipe</code> (Usuario)
          </p>
          <p style={{ margin: '0.25rem 0 0 0' }}>
            <code>root</code> | <code>root</code> (Admin)
          </p>
          <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.75rem', color: '#6b7280' }}>
            Contraseñas protegidas con hash SHA256
          </p>
        </div>
      )}
    </div>
  )
}
