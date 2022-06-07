export interface IHttpResponse {
  statusCode: number
  body: any
  // TODO: another field to req.user
}

export interface IHttpRequest {
  body?: any
}
