import bcrypt from 'bcrypt'
import { CryptAdapter } from './crypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await new Promise(resolve => resolve('hash_value'))
  }
}))

describe('CRYPT ADAPTER', () => {
  test('Should call crypt with correct value', async () => {
    const salt = 10
    const sut = new CryptAdapter(salt)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  test('Should return a hash on success', async () => {
    const salt = 10
    const sut = new CryptAdapter(salt)
    const hash = await sut.encrypt('any_value')
    expect(hash).toBe('hash_value')
  })
})
