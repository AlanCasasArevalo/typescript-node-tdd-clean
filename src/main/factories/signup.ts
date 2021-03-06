/** **********************************   Interfaces      ************************************/
import { Controller, EmailValidator } from '../../presentation/protocols'
import { Encrypter } from '../../data/protocols/encrypter'
import { AddAccount } from '../../domain/uses-cases/add-account'
import { AddAccountRepository } from '../../data/protocols/add-account-repository'
/** **********************************   Instances      ************************************/
import { SignUpController } from '../../presentation/controllers/signup/signup'
import { CryptAdapter } from '../../infra/criptography/crypt-adapter'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { LogControllerDecorator } from '../decorators/log'
import { LogMongoRepository } from '../../infra/db/mongodb/log-repository/LogMongoRepository'

export const makeSignUpController = (): Controller => {
  const signUpController = new SignUpController(makeEmailValidator(), makeDBAddAccount())
  return new LogControllerDecorator(signUpController, makeLogErrorRepository())
}

const makeEmailValidator = (): EmailValidator => {
  const emailValidator = new EmailValidatorAdapter()
  return emailValidator
}

const makeDBAddAccount = (): AddAccount => {
  const dBAddAccount = new DbAddAccount(makeEncrypter(), makeAddAccountRepository())
  return dBAddAccount
}

const makeAddAccountRepository = (): AddAccountRepository => {
  const addAccountRepository = new AccountMongoRepository()
  return addAccountRepository
}

const makeEncrypter = (): Encrypter => {
  const encrypter = new CryptAdapter(10)
  return encrypter
}

const makeLogErrorRepository = (): LogMongoRepository => {
  const logErrorRepository = new LogMongoRepository()
  return logErrorRepository
}
