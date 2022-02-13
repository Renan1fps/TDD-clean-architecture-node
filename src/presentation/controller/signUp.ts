import { IHttpRequest, IHttpResponse } from '../protocols/http'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'
import { Controller } from '../protocols/conttroller'

export class SignUpController implements Controller {
  handle (httpRequest: IHttpRequest): IHttpResponse {
    const requiredfields = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requiredfields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}
