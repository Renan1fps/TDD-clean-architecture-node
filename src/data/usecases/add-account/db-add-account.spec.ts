import { DbAccount } from './db-add-account'

describe('DbAddAccount useCase', () => {
  test('Should call Encrypt with correct email', async () => {
    class EncryptStub {
      async encrypt (value: string): Promise<string> {
        return await new Promise(resolve => resolve('hashed_passowrd'))
      }
    }

    const encryptStub = new EncryptStub()
    const sut = new DbAccount(encryptStub)
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
