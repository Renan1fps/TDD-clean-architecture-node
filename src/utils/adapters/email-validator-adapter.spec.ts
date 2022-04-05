import { EmailValidator } from './email-validator-adapter'
import validator from 'validator'

jest.mock('validator', () => ({
  isEmail: () => {
    return true
  }
}))

describe('EmailValidator', () => {
  test('Should return false if an invalid mail is provided', () => {
    const sut = new EmailValidator()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid('invalid-email@mail.com')
    expect(isValid).toBe(false)
  })

  test('Should return true if a valid mail is provided', () => {
    const sut = new EmailValidator()
    const isValid = sut.isValid('any-mail@mail.com')
    expect(isValid).toBe(true)
  })

  test('Should call validator with correct email', () => {
    const sut = new EmailValidator()
    const isEmailSpy = jest.spyOn(sut, 'isValid')
    sut.isValid('any-mail@mail.com')
    expect(isEmailSpy).toHaveBeenCalledWith('any-mail@mail.com')
  })
})
