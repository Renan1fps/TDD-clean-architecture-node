import { IAccountModel, IAddAccount, IAddAcountModel, Encrypter, IAddAccountRepository } from './db-add-account-protocols'

export class DbAccount implements IAddAccount {
  constructor (
    private readonly encrypter: Encrypter,
    private readonly addAccountRepository: IAddAccountRepository
  ) { }

  async add (accountData: IAddAcountModel): Promise<IAccountModel> {
    const hashPassword = await this.encrypter.encrypt(accountData.password)
    const account = await this.addAccountRepository.add(Object.assign({}, accountData, {
      password: hashPassword
    }))
    return await new Promise(resolve => resolve(account))
  }
}
