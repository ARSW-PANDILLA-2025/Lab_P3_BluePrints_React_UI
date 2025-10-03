// SEGURIDAD: Solo se almacenan hashes SHA256 precalculados

import { passwordUtils, preGeneratedHashes } from '../utils/passwordUtils.js'

export const mockUsers = [
  {
    username: 'cristian',
    passwordHash: preGeneratedHashes.user_dev_001,
    email: 'cristian@example.com',
    name: 'Cristian'
  },
  {
    username: 'angel',
    passwordHash: preGeneratedHashes.user_dev_002,
    email: 'angel@example.com',
    name: 'Angel'
  },
  {
    username: 'root',
    passwordHash: preGeneratedHashes.user_admin_001,
    email: 'admin@company.com',
    name: 'Administrador',
    isAdmin: true
  },
  {
    username: 'santiago',
    passwordHash: preGeneratedHashes.user_dev_003,
    email: 'santiago@example.com',
    name: 'Santiago'
  },
  {
    username: 'angie',
    passwordHash: preGeneratedHashes.user_dev_004,
    email: 'angie@example.com',
    name: 'Angie'
  },
  {
    username: 'felipe',
    passwordHash: preGeneratedHashes.user_dev_005,
    email: 'felipe@example.com',
    name: 'Felipe'
  }
]

export const userUtils = {
  findByUsername(username) {
    return mockUsers.find(user => user.username === username)
  },

  async validateCredentials(username, hashedPassword) {
    const user = this.findByUsername(username)
    if (!user) return null

    const isValidPassword = hashedPassword === user.passwordHash
    return isValidPassword ? user : null
  },

  async addUser(userData) {
    const { username, password, email, name, isAdmin = false } = userData

    if (this.findByUsername(username)) {
      throw new Error('El usuario ya existe')
    }

    const passwordHash = await passwordUtils.hashPassword(password)

    const newUser = { username, passwordHash, email, name, isAdmin }
    mockUsers.push(newUser)
    return newUser
  },

  getAllUsers() {
    return mockUsers.map(({ passwordHash, ...user }) => user)
  },

  getUserCount() {
    return mockUsers.length
  },

  isAdmin(username) {
    const user = this.findByUsername(username)
    return user?.isAdmin === true
  }
}

export default mockUsers