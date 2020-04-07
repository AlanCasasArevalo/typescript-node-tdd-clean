import { DbAddAccount } from './db-add-account'
import { AccountModel, AddAccountModel, Encrypter, AddAccountRepository } from './db-add-account-protocols'

interface SutType {
  sut: DbAddAccount
  encryptStub: Encrypter
  addAccountRepositoryStub: AddAccountRepository
}

const makeEncrypter = (): Encrypter => {
  class EncryptStub implements Encrypter {
    async encrypt (value: string): Promise<string> {
      return await new Promise(resolve => resolve('hashed_password'))
    }
  }

  return new EncryptStub()
}

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async addAccount (accountData: AddAccountModel): Promise<AccountModel> {
      const fakeAccount = {
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email@gmail.com',
        password: 'hashed_password'
      }
      return await new Promise(resolve => resolve(fakeAccount))
    }
  }

  return new AddAccountRepositoryStub()
}

const makeSut = (): SutType => {
  const encryptStub = makeEncrypter()
  const addAccountRepositoryStub = makeAddAccountRepository()
  const sut = new DbAddAccount(encryptStub, addAccountRepositoryStub)
  return {
    sut,
    encryptStub,
    addAccountRepositoryStub
  }
}

describe('DATA LAYER ADD ACCOUNT USE CASE', () => {
  test('Should call Encrypter with correct password', async () => {
    const { sut, encryptStub } = makeSut()
    const encryptSpy = jest.spyOn(encryptStub, 'encrypt')
    const account = {
      name: 'valid_name',
      email: 'valid_email@gmail.com',
      password: 'valid_password'
    }
    await sut.addAccount(account)
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })

  test('Should throws if Encrypter throws', async () => {
    const { sut, encryptStub } = makeSut()
    jest.spyOn(encryptStub, 'encrypt').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const account = {
      name: 'valid_name',
      email: 'valid_email@gmail.com',
      password: 'valid_password'
    }
    const promise = sut.addAccount(account)
    await expect(promise).rejects.toThrow()
  })

  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const addAccountSpy = jest.spyOn(addAccountRepositoryStub, 'addAccount')
    const account = {
      name: 'valid_name',
      email: 'valid_email@gmail.com',
      password: 'valid_password'
    }
    await sut.addAccount(account)
    expect(addAccountSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email@gmail.com',
      password: 'hashed_password'
    })
  })
})
