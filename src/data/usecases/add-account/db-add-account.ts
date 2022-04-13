import { IAccountModel, IAddAccount, IAddAcountModel, Encrypter } from './db-add-account-protocols'

export class DbAccount implements IAddAccount {
  constructor (private readonly encrypter: Encrypter) {}

  async add (account: IAddAcountModel): Promise<IAccountModel> {
    await this.encrypter.encrypt(account.password)
    return await new Promise(resolve => resolve(null))
  }
}
