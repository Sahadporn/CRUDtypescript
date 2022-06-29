import { MongoClient, ObjectId, Collection, FindCursor, WithId } from "mongodb"
import { Profile } from "../entity/Profile"

export class MongoRepo {
  coll: any
  constructor(config: {
    user: string
    password: string
    host: string
    port: number
    db: string
  }) {
    let uri = `mongodb://${config.user}:${config.password}@${config.host}:${config.port}/`

    let client = new MongoClient(uri)
    ;async () => {
      await client.connect()
    }

    let db = client.db(config.db)
    this.coll = db.collection("profile")
  }

  /**
   * createProfileObject
   */
  public createProfileObject(result: any) {
    return new Profile(result._id, result.name, result.age, result.address, result.created_date, result.updated_date)
  }

  /**
   * getAllData from the specified collection from database
   */
  public async getAllData() {
    let result = await this.coll.find().toArray()

    return JSON.stringify(result)
  }

  public async getDataById(filter: { _id: string }) {
    let result = await this.coll.findOne(filter)

    return this.createProfileObject(result)
  }
}
