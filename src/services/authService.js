import apimock from './apimock.js'
import api from './apiClient.js'

const useMock = String(import.meta.env.VITE_USE_MOCK || 'false').toLowerCase() === 'true'

const authService = {
  async login(credentials) {
    if (useMock) {
      return await apimock.login(credentials)
    } else {
      const { data } = await api.post('/auth/login', credentials)
      return data
    }
  }
}

export default authService