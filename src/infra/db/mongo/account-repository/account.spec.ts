import { MongoHelper } from '../helper/mongodeb-helper'
import { AccountMongoRepository } from './account'

const makeSut = (): AccountMongoRepository => {
  return new AccountMongoRepository()
}

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.intance.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.intance.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = MongoHelper.intance.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  test('Should return account on success', async () => {
    const sut = makeSut()
    const account = await sut.add({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email@mail.com')
    expect(account.password).toBe('any_password')
  })
})
