import { IAccountModel } from '../../../domain/models/account'
import { IAddAccount, IAddAcountModel } from '../../../domain/usecases/add-account'
import { Encrypter } from '../../protocols/encrypter'

export class DbAccount implements IAddAccount {
  constructor (private readonly encrypter: Encrypter) {}

  async add (account: IAddAcountModel): Promise<IAccountModel> {
    await this.encrypter.encrypt(account.password)
    return await new Promise(resolve => resolve(null))
  }
}
