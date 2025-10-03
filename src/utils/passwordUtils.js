export const passwordUtils = {
  // Generar hash SHA256
  async hashPassword(plainPassword) {
    const encoder = new TextEncoder()
    const data = encoder.encode(plainPassword)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
    return hashHex
  },

  // Verificar contraseña contra hash SHA256
  async verifyPassword(plainPassword, hashedPassword) {
    const inputHash = await this.hashPassword(plainPassword)
    return inputHash === hashedPassword
  },

  // Generar hashes SHA256 (Admin/Dev)
  async generateHashFromInput(inputPassword) {
    if (!inputPassword || typeof inputPassword !== 'string') {
      throw new Error('Password requerido para generar hash')
    }
    return await this.hashPassword(inputPassword)
  }
}

export const preGeneratedHashes = {
  user_dev_001: '1505e1f8fa878cdc44dec9aded681d7891b63a28249dccd2180a96359a92658d',
  user_dev_002: '519ba91a5a5b4afb9dc66f8805ce8c442b6576316c19c6896af2fa9bda6aff71',
  user_admin_001: '4813494d137e1631bba301d5acab6e7bb7aa74ce1185d456565ef51d737677b2',
  user_dev_003: '49faaade493be8b6b6164ee67f7e4d101812a5dda970d6ca693dda8b8cf82e4b',
  user_dev_004: 'f0fd52e74857e4e8cf2dba8cf46befa7f6283264a7b28b3725c80718c59b32bd',
  user_dev_005: '2bd2d3a31934d76198acc030caca4c31965474fe5fa48f35fef79d0fd74ee1b2'
}

export default passwordUtils