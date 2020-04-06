import { DbAddAccount } from './db-add-account'

describe('DATA LAYER ADD ACCOUNT USE CASE', () => {
  test('Should call Encrypter with correct password', async () => {
    class EncryptStub {
      async encrypt (value: string): Promise<string> {
        return await new Promise(resolve => resolve('hashed_password'))
      }
    }
    const encryptStub = new EncryptStub()
    const sut = new DbAddAccount(encryptStub)
    const encryptSpy = jest.spyOn(encryptStub, 'encrypt')
    const account = {
      name: 'valid_name',
      email: 'valid_email@gmail.com',
      password: 'valid_password'
    }
    await sut.addAccount(account)
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })
})
