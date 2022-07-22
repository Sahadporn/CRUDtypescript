import { Collection, MongoClient } from 'mongodb'
import { ProfileEntity } from '../entity/Profile-entity'
import { ProfileDbInterface } from '../useCases/profile-usecases'
import 'reflect-metadata' // TODO: Remove this
import { Container, Service } from 'typedi'
import { config } from '../presenters/config'
import { ElementFlags } from 'typescript'

type DbConfig = {
  user: string
  password: string
  host: string
  port: number
  db: string
  collection: string
}

@Service()
export class ProfileDbAdapter implements ProfileDbInterface {
  private dbCollection: Collection<ProfileEntity> | any // TODO: Don't have to be any
  private readonly dbConfig: DbConfig

  constructor(dbConfig: DbConfig) {
    this.dbConfig = dbConfig
  }

  public async connect(): Promise<void> {
    let uri = `mongodb://${this.dbConfig.user}:${this.dbConfig.password}@${this.dbConfig.host}:${this.dbConfig.port}/`

    const connection = await new MongoClient(uri).connect()
    this.dbCollection = connection
      .db(this.dbConfig.db)
      .collection(this.dbConfig.collection)
  }

  public getConfig() {
    return this.dbConfig
  }

  // TODO: Is public, can be used by other in wrong ways
  // result: any
  // private => cannot test
  // too much chore, just implement it directly
  private createProfileObject(result: any) {
    return new ProfileEntity(
      result._id,
      result.name,
      result.age,
      result.address,
      result.created_date,
      result.updated_date
    )
  }

  public async getAll(): Promise<ProfileEntity[]> {
    const data = await this.dbCollection.find().toArray()

    if (!data) {
      throw new Error(`Cannot retrieve data`)
    }

    // TODO: Use map instead of forEach
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
    let arr: ProfileEntity[] = []
    data.map((element: ProfileEntity) => {
      arr.push(this.createProfileObject(element))
    })
    return arr
  }

  public async getById(id: string): Promise<ProfileEntity> {
    let data = await this.dbCollection.findOne({ _id: id })

    if (!data) {
      throw new Error(`Cannot find profile with id ${id}}`)
    }

    return this.createProfileObject(data)
  }

  // TODO: Do you want to always update name, age and address?
  // TODO: Make sure that name, age and address is not undefined at runtime
  // TODO: The function name is not clear, who would have known it can update too!!
  // Refactor this into two function better na!
  public async insert(
    id: string,
    name: string,
    age: number,
    address: string[]
  ): Promise<void> {
    try {
      let res = await this.dbCollection.updateOne(
        { _id: id },
        {
          $currentDate: { updated_date: true },
          $set: {
            name: name,
            age: age,
            address: address
          },
          $setOnInsert: { created_date: new Date() }
        },
        { upsert: true }
      )
    } catch (err) {
      console.log('Insert failed: ', err)
    }
  }

  public async delete(id: string): Promise<void> {
    try {
      let res = await this.dbCollection.deleteOne({ _id: id })
    } catch (err) {
      console.log('Deletion failed: ', err)
    }
  }
}

// TODO: Delete this
// Container.set([{
//   id: "ProfileDbDi",
//   value: new ProfileDbAdapter(config.mongoConfig)
// }])
