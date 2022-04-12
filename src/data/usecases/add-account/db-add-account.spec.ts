import { Encrypter } from '../../protocols/encrypter'
import { DbAccount } from './db-add-account'

interface ISutTypes {
  sut: DbAccount
  encryptStub: Encrypter
}

const makeEncrypter = (): Encrypter => {
  class EncryptStub implements Encrypter {
    async encrypt (value: string): Promise<string> {
      return await new Promise(resolve => resolve('hashed_passowrd'))
    }
  }

  return new EncryptStub()
}

const makeSut = (): ISutTypes => {
  const encryptStub = makeEncrypter()
  const sut = new DbAccount(encryptStub)

  return {
    sut,
    encryptStub
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
})
