import bcrypt from 'bcrypt'
import { CryptAdapter } from './crypt-adapter'

describe('CRYPT ADAPTER', () => {
  test('Should call crypt with correct value', async () => {
    const salt = 10
    const sut = new CryptAdapter(salt)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })
})
