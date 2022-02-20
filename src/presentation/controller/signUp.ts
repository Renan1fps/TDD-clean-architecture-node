import { IHttpRequest, IHttpResponse } from '../protocols/http'
import { MissingParamError, InvalidParamError } from '../errors'
import { badRequest, serverError } from '../helpers/http-helper'
import { Controller } from '../protocols/conttroller'
import { IEmailValidator } from '../protocols/email-validator'

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

      const isValid = this.emailValidator.isValid(httpRequest.body.email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
    } catch (err) {
      return serverError()
    }
  }
}
