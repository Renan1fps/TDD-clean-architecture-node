export class MissingParamError extends Error {
  constructor (paramError: string) {
    super(`Missing param ${paramError}`)
    this.name = 'MissingParamError'
  }
}
