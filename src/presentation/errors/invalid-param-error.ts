export class InvalidParamError extends Error {
  constructor (paramError: string) {
    super(`Invalid param ${paramError}`)
    this.name = 'invalidParamError'
  }
}
