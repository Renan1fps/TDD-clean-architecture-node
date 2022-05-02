import { IAddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { IAccountModel } from '../../../../domain/models/account'
import { IAddAcountModel } from '../../../../domain/usecases/add-account'
import { MongoHelper } from '../helper/mongodeb-helper'

export class AccountMongoRepository implements IAddAccountRepository {
  async add (accountData: IAddAcountModel): Promise<IAccountModel> {
    const accountCollection = MongoHelper.intance.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    const findAccountById = await accountCollection.findOne({ _id: result.insertedId })
    const { _id, ...rest } = findAccountById
    const account = Object.assign({}, rest, { id: _id }) as unknown as IAccountModel

    return account
  }
}
