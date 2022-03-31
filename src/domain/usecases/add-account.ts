import { IAccountModel } from '../models/account'

export interface IAddAcountModel{
  name: string
  email: string
  password: string
}

export interface IAddAccount{
  add: (account: IAddAcountModel) => IAccountModel
}
