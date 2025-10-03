import apimock from './apimock.js'
import serviceClient from './serviceClient.js'

const useMock = String(import.meta.env.VITE_USE_MOCK || 'false').toLowerCase() === 'true'

const service = useMock ? apimock : serviceClient

export default service
