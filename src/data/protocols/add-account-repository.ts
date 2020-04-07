import { AddAccountModel } from '../../domain/uses-cases/add-account'
import { AccountModel } from '../../domain/models/account'

export interface AddAccountRepository {
  addAccount(accountData: AddAccountModel): Promise<AccountModel>
}
