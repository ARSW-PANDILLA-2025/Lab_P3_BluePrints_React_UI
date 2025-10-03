import { NavLink, Route, Routes } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import BlueprintsPage from './pages/BlueprintsPage.jsx'
import BlueprintDetailPage from './pages/BlueprintDetailPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import UsersPage from './pages/UsersPage.jsx'
import NotFound from './pages/NotFound.jsx'

function AppContent() {
  const { isAuthenticated, user, logout } = useAuth()

  return (
    <div className="container">
      <header>
        <h1>ECI - Laboratorio de Blueprints en React</h1>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <NavLink to="/" end>
              Blueprints
            </NavLink>
            {isAuthenticated && user?.isAdmin && (
              <NavLink to="/users" style={{ marginLeft: '1rem' }}>
                Usuarios
              </NavLink>
            )}
            {!isAuthenticated && (
              <NavLink to="/login" style={{ marginLeft: '1rem' }}>
                Login
              </NavLink>
            )}
          </div>
          {isAuthenticated && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                Bienvenido, <strong>{user?.name || user?.username}</strong>
              </span>
              <button
                onClick={logout}
                className="btn"
                style={{
                  backgroundColor: '#ef4444',
                  color: 'white',
                  padding: '0.25rem 0.75rem',
                  fontSize: '0.875rem',
                }}
              >
                Cerrar Sesión
              </button>
            </div>
          )}
        </nav>
      </header>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <BlueprintsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/blueprints/:author/:name"
          element={
            <ProtectedRoute>
              <BlueprintDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <UsersPage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}
