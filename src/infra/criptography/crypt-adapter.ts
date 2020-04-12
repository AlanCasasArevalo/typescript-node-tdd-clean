import { Encrypter } from '../../data/protocols/encrypter'
import bcrypt from 'bcrypt'

export class CryptAdapter implements Encrypter {
  private readonly salt: number

  constructor (salt: number) {
    this.salt = salt
  }

  async encrypt (value: string): Promise<string> {
    const hash = await bcrypt.hash(value, 10)
    return hash
  }
}
