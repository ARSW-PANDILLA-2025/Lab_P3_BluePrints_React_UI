import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext.jsx'
import { userUtils } from '../data/mockUsers.js'

export default function UserAdmin() {
  const { user } = useAuth()
  const [users, setUsers] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
    email: '',
    name: '',
    isAdmin: false,
  })

  useEffect(() => {
    setUsers(userUtils.getAllUsers())
  }, [])

  const handleAddUser = async (e) => {
    e.preventDefault()
    try {
      await userUtils.addUser(newUser)
      setUsers(userUtils.getAllUsers())
      setNewUser({ username: '', password: '', email: '', name: '', isAdmin: false })
      setShowAddForm(false)
      alert('Usuario agregado exitosamente')
    } catch (error) {
      alert(error.message)
    }
  }

  if (!user?.isAdmin) {
    return (
      <div className="card">
        <h3>Acceso Denegado</h3>
        <p>Solo los administradores pueden acceder a esta sección.</p>
      </div>
    )
  }

  return (
    <div className="card">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem',
        }}
      >
        <h3 style={{ margin: 0 }}>Administración de Usuarios</h3>
        <button className="btn primary" onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? 'Cancelar' : 'Agregar Usuario'}
        </button>
      </div>

      {showAddForm && (
        <form
          onSubmit={handleAddUser}
          style={{
            marginBottom: '2rem',
            padding: '1rem',
            backgroundColor: '#f9fafb',
            borderRadius: '8px',
          }}
        >
          <h4 style={{ marginTop: 0 }}>Nuevo Usuario</h4>
          <div className="grid cols-2">
            <div>
              <label>Username</label>
              <input
                className="input"
                value={newUser.username}
                onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                required
              />
            </div>
            <div>
              <label>Nombre Completo</label>
              <input
                className="input"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label>Email</label>
              <input
                type="email"
                className="input"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                required
              />
            </div>
            <div>
              <label>Contraseña</label>
              <input
                type="password"
                className="input"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                required
              />
            </div>
            <div>
              <label>Tipo de Usuario</label>
              <select
                className="input"
                value={newUser.isAdmin ? 'admin' : 'user'}
                onChange={(e) => setNewUser({ ...newUser, isAdmin: e.target.value === 'admin' })}
              >
                <option value="user">Usuario Normal</option>
                <option value="admin">Administrador</option>
              </select>
            </div>
          </div>
          <button type="submit" className="btn primary" style={{ marginTop: '1rem' }}>
            Crear Usuario
          </button>
        </form>
      )}

      <div>
        <h4>Usuarios Registrados ({users.length})</h4>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                <th style={{ padding: '0.75rem', textAlign: 'left' }}>Username</th>
                <th style={{ padding: '0.75rem', textAlign: 'left' }}>Nombre</th>
                <th style={{ padding: '0.75rem', textAlign: 'left' }}>Email</th>
                <th style={{ padding: '0.75rem', textAlign: 'left' }}>Tipo</th>
                <th style={{ padding: '0.75rem', textAlign: 'left' }}>Estado</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, index) => (
                <tr key={u.username} style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '0.75rem' }}>
                    <code
                      style={{
                        backgroundColor: '#f3f4f6',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '4px',
                        color: '#000000',
                      }}
                    >
                      {u.username}
                    </code>
                    {u.username === user.username && (
                      <span style={{ marginLeft: '0.5rem', fontSize: '0.75rem', color: '#059669' }}>
                        (Tú)
                      </span>
                    )}
                  </td>
                  <td style={{ padding: '0.75rem' }}>{u.name}</td>
                  <td style={{ padding: '0.75rem' }}>{u.email}</td>
                  <td style={{ padding: '0.75rem' }}>
                    <span
                      style={{
                        padding: '0.25rem 0.5rem',
                        borderRadius: '12px',
                        fontSize: '0.75rem',
                        backgroundColor: u.isAdmin ? '#fef3c7' : '#e0f2fe',
                        color: u.isAdmin ? '#92400e' : '#0c4a6e',
                      }}
                    >
                      {u.isAdmin ? 'Admin' : 'Usuario'}
                    </span>
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    <span style={{ color: '#059669', fontSize: '0.875rem' }}>✓ Activo</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div
        style={{
          marginTop: '2rem',
          padding: '1rem',
          backgroundColor: '#f0f9ff',
          borderRadius: '8px',
          fontSize: '0.875rem',
          color: '#000000',
        }}
      >
        <p style={{ margin: '0 0 0.5rem 0', color: '#000000' }}>
          <strong>Archivo de usuarios:</strong>{' '}
          <code style={{ color: '#000000' }}>src/data/mockUsers.js</code>
        </p>
        <p style={{ margin: '0', color: '#000000' }}>
          Puedes agregar usuarios directamente editando el archivo o usando este formulario.
        </p>
      </div>
    </div>
  )
}
