import { DbAccount } from './db-add-account'
import { Encrypter, IAccountModel, IAddAcountModel, IAddAccountRepository } from './db-add-account-protocols'

const makeEncrypter = (): Encrypter => {
  class EncryptStub implements Encrypter {
    async encrypt (value: string): Promise<string> {
      return await new Promise(resolve => resolve('hashed_passowrd'))
    }
  }

  return new EncryptStub()
}

const makeAddAccountRepository = (): IAddAccountRepository => {
  class AddAccountRepositoryStub implements IAddAccountRepository {
    async add (accountData: IAddAcountModel): Promise<IAccountModel> {
      const fakeAccount: IAccountModel = {
        id: 'valid_id',
        email: 'valid_email',
        name: 'valid_name',
        password: 'hashed_passowrd'
      }
      return await new Promise(resolve => resolve(fakeAccount))
    }
  }

  return new AddAccountRepositoryStub()
}

interface ISutTypes {
  sut: DbAccount
  encryptStub: Encrypter
  addAccountRepositoryStub: IAddAccountRepository
}

const makeSut = (): ISutTypes => {
  const addAccountRepositoryStub = makeAddAccountRepository()
  const encryptStub = makeEncrypter()
  const sut = new DbAccount(encryptStub, addAccountRepositoryStub)

  return {
    sut,
    encryptStub,
    addAccountRepositoryStub
  }
}

describe('DbAddAccount useCase', () => {
  test('Should call Encrypt with correct email', async () => {
    const { sut, encryptStub } = makeSut()
    const encryptSpy = jest.spyOn(encryptStub, 'encrypt')
    const accountData = {
      email: 'valid_email@gmail.com',
      name: 'valid_name',
      password: 'valid_password'
    }
    await sut.add(accountData)
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })

  test('Should throw if Encrypt throws', async () => {
    const { sut, encryptStub } = makeSut()
    jest.spyOn(encryptStub, 'encrypt').mockReturnValueOnce(new Promise((_resolve, reject) => reject(new Error())))
    const accountData = {
      email: 'valid_email@gmail.com',
      name: 'valid_name',
      password: 'valid_password'
    }
    const promise = sut.add(accountData)
    await expect(promise).rejects.toThrow()
  })

  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    const accountData = {
      email: 'valid_email@gmail.com',
      name: 'valid_name',
      password: 'valid_password'
    }
    await sut.add(accountData)
    expect(addSpy).toHaveBeenCalledWith({
      email: 'valid_email@gmail.com',
      name: 'valid_name',
      password: 'hashed_passowrd'
    })
  })

  test('Should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'add').mockReturnValueOnce(new Promise((_resolve, reject) => reject(new Error())))
    const accountData = {
      email: 'valid_email@gmail.com',
      name: 'valid_name',
      password: 'valid_password'
    }
    const promise = sut.add(accountData)
    await expect(promise).rejects.toThrow()
  })
})
