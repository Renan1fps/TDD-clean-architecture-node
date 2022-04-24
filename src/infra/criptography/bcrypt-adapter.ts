import bcrypt from 'bcrypt'

export class BcryptAdapter {
  constructor (private readonly salt: number) { }

  async encrypt (value: string): Promise<string> {
    await bcrypt.hash(value, this.salt)
    return await new Promise(resolve => resolve(''))
  }
}
