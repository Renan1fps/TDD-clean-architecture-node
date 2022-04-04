import { EmailValidator } from './email-validator-adapter'

describe('EmailValidator', () => {
  test('Should return false if an invalid mail is provided', () => {
    const sut = new EmailValidator()
    const validMail = sut.isValid('invalid-mail@mail.com')
    expect(validMail).toBe(false)
  })
})
