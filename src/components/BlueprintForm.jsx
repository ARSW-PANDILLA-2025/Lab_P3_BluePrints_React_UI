import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext.jsx'

export default function BlueprintForm({ onSubmit }) {
  const { user } = useAuth()
  const [name, setName] = useState('')
  const [pointsJSON, setPointsJSON] = useState('[{"x":10,"y":10},{"x":40,"y":60}]')

  // Hicimos que el autor fuera quien se loggea

  const handle = (e) => {
    e.preventDefault()
    if (!user?.username) {
      alert('Error: Usuario no autenticado')
      return
    }
    try {
      const points = JSON.parse(pointsJSON)
      onSubmit({ author: user.username, name, points })
    } catch (e) {
      alert('JSON de puntos inválido')
    }
  }

  return (
    <form onSubmit={handle} className="card">
      <h3 style={{ marginTop: 0 }}>Crear Blueprint</h3>
      <div className="grid cols-2">
        <div>
          <label htmlFor="author">Autor</label>
          <input
            id="author"
            className="input"
            value={user?.username || 'No autenticado'}
            disabled
            style={{
              backgroundColor: '#f3f4f6',
              cursor: 'not-allowed',
              color: '#6b7280',
            }}
          />
          <small style={{ color: '#6b7280', fontSize: '0.75rem' }}>
            Autor automático basado en el usuario loggeado
          </small>
        </div>
        <div>
          <label htmlFor="name">Nombre</label>
          <input
            id="name"
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="mi-dibujo"
            required
          />
        </div>
      </div>
      <div style={{ marginTop: 12 }}>
        <label htmlFor="points">Puntos (JSON)</label>
        <textarea
          id="points"
          className="input"
          rows="5"
          value={pointsJSON}
          onChange={(e) => setPointsJSON(e.target.value)}
        />
      </div>
      <div style={{ marginTop: 12 }}>
        <button className="btn primary">Guardar</button>
      </div>
    </form>
  )
}
