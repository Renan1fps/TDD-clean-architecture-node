import { Collection, MongoClient } from 'mongodb'

// Singleton
export class MongoHelper {
  private client: MongoClient = null
  private static _instance: MongoHelper

  private constructor () { }

  static get intance (): MongoHelper {
    if (!this._instance) {
      MongoHelper._instance = new MongoHelper()
    }
    return this._instance
  }

  async connect (url: string): Promise<void> {
    this.client = await MongoClient.connect(process.env.MONGO_URL)
  }

  async disconnect (): Promise<void> {
    await this.client.close()
  }

  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  }
}
