import { ServerError } from '../errors/server-error'
import { IHttpResponse } from '../protocols/http'

export const badRequest = (err: Error): IHttpResponse => ({
  statusCode: 400,
  body: err
})

export const serverError = (): IHttpResponse => ({
  statusCode: 500,
  body: new ServerError()
})
