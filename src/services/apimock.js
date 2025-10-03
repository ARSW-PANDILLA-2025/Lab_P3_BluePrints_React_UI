import { userUtils } from '../data/mockUsers.js'

const seed = [
  {
    author: 'john',
    name: 'house',
    points: [
      { x: 10, y: 20 },
      { x: 60, y: 40 },
      { x: 120, y: 80 },
    ],
  },
  {
    author: 'john',
    name: 'bridge',
    points: [
      { x: 20, y: 40 },
      { x: 90, y: 40 },
      { x: 160, y: 100 },
    ],
  },
  {
    author: 'sarah',
    name: 'mall',
    points: [
      { x: 30, y: 60 },
      { x: 120, y: 90 },
      { x: 200, y: 140 },
    ],
  },
]

let db = [...seed]

const delay = (ms) => new Promise((res) => setTimeout(res, ms))

export default {
  async getAll() {
    await delay(50)
    return [...db]
  },
  async getByAuthor(author) {
    await delay(50)
    return db.filter((bp) => bp.author.toLowerCase() === String(author).toLowerCase())
  },
  async getByAuthorAndName(author, name) {
    await delay(50)
    const found = db.find(
      (bp) =>
        bp.author.toLowerCase() === String(author).toLowerCase() &&
        bp.name.toLowerCase() === String(name).toLowerCase(),
    )
    if (!found) throw new Error('Blueprint no encontrado')
    return { ...found }
  },
  async create(payload) {
    await delay(50)
    const exists = db.some(
      (bp) =>
        bp.author.toLowerCase() === String(payload.author).toLowerCase() &&
        bp.name.toLowerCase() === String(payload.name).toLowerCase(),
    )
    if (exists) throw new Error('Ya existe un blueprint con ese autor/nombre')
    const created = { author: payload.author, name: payload.name, points: payload.points || [] }
    db.push(created)
    return created
  },
  async update(author, name, payload) {
    await delay(50)
    const idx = db.findIndex(
      (bp) =>
        bp.author.toLowerCase() === String(author).toLowerCase() &&
        bp.name.toLowerCase() === String(name).toLowerCase(),
    )
    if (idx === -1) throw new Error('Blueprint no encontrado')
    const updated = { ...db[idx], ...payload }
    db[idx] = updated
    return { ...updated }
  },
  async remove(author, name) {
    await delay(50)
    const before = db.length
    db = db.filter(
      (bp) =>
        !(
          bp.author.toLowerCase() === String(author).toLowerCase() &&
          bp.name.toLowerCase() === String(name).toLowerCase()
        ),
    )
    if (db.length === before) throw new Error('Blueprint no encontrado')
    return { ok: true }
  },

  // Métodos de autenticación mock con seguridad
  async login(credentials) {
    await delay(100)
    const { username, password } = credentials

    // Validación segura con hash (password ya viene hasheada desde el frontend)
    const user = await userUtils.validateCredentials(username, password)

    if (!user) {
      throw new Error('Credenciales inválidas')
    }

    // Generar token JWT mock (en producción esto se haría en el backend)
    const payload = {
      sub: user.username,
      username: user.username,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin || false,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 horas
    }

    // Token JWT mock (en producción sería firmado correctamente)
    const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(JSON.stringify(payload))}.mock-signature`

    return { token }
  }
}
