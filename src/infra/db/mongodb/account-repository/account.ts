import { AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { AddAccountModel } from '../../../../domain/uses-cases/add-account'
import { AccountModel } from '../../../../domain/models/account'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    // Obtenemos del helper de mongo la coleccion a la que estamos accediendo
    const accountCollection = await MongoHelper.getCollection('accounts')
    // Metemos en la coleccion el objeto que queremos meter
    const result = await accountCollection.insertOne(accountData)
    // Obtenemos de la insercion el resultado en la primera posicion del array nos devuelve el dato insertado correctamente.
    const account = result.ops[0]
    // Cambiamos el ._id que nos llega desde mongoDb a .id
    const accountToReturn = MongoHelper.map(account)
    // Devolvemos el resultado de nuestra insercion correcta.
    return await new Promise(resolve => resolve(accountToReturn))
  }
}
