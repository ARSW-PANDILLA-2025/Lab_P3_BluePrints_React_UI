import { createContext, useContext, useEffect, useReducer } from 'react'
import { jwtDecode } from 'jwt-decode'

const AuthContext = createContext()

// Estados de autenticación
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, loading: true, error: null }
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        error: null
      }
    case 'LOGIN_FAILURE':
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        token: null,
        error: action.payload
      }
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        error: null,
        loading: false
      }
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    default:
      return state
  }
}

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  loading: true,
  error: null
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState)

  // Verificar token al cargar la aplicación
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const decoded = jwtDecode(token)
        const currentTime = Date.now() / 1000
        
        if (decoded.exp > currentTime) {
          // Token válido
          dispatch({
            type: 'LOGIN_SUCCESS',
            payload: {
              token,
              user: {
                id: decoded.sub,
                username: decoded.username || decoded.preferred_username || decoded.email,
                email: decoded.email,
                name: decoded.name || decoded.given_name || decoded.username
              }
            }
          })
        } else {
          // Token expirado
          localStorage.removeItem('token')
          dispatch({ type: 'LOGOUT' })
        }
      } catch (error) {
        console.error('Token inválido:', error)
        localStorage.removeItem('token')
        dispatch({ type: 'LOGOUT' })
      }
    } else {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }, [])

  // Login tradicional con username/password
  const login = async (credentials) => {
    dispatch({ type: 'LOGIN_START' })
    
    try {
      const authService = (await import('../services/authService.js')).default
      const data = await authService.login(credentials)
      const { token } = data
      
      // Decodificar token para obtener información del usuario
      const decoded = jwtDecode(token)
      const user = {
        id: decoded.sub,
        username: decoded.username || decoded.preferred_username || decoded.email,
        email: decoded.email,
        name: decoded.name || decoded.given_name || decoded.username,
        isAdmin: decoded.isAdmin || false
      }

      localStorage.setItem('token', token)
      
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { token, user }
      })

      return { success: true }
    } catch (error) {
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: error.message
      })
      return { success: false, error: error.message }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    dispatch({ type: 'LOGOUT' })
  }

  const value = {
    ...state,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider')
  }
  return context
}