import { IHttpRequest, IHttpResponse, IEmailValidator, Controller } from '../protocols'
import { MissingParamError, InvalidParamError } from '../errors'
import { badRequest, serverError } from '../helpers/http-helper'
export class SignUpController implements Controller {
  constructor (private readonly emailValidator: IEmailValidator) { }

  handle (httpRequest: IHttpRequest): IHttpResponse {
    try {
      const requiredfields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredfields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { password, passwordConfirmation, email } = httpRequest.body
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
    } catch (err) {
      return serverError()
    }
  }
}
