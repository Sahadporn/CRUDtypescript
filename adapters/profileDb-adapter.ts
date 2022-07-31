import { Collection, MongoClient } from 'mongodb'
import { ProfileEntity } from '../entity/Profile-entity'
import { ProfileDbInterface } from '../useCases/profile-usecases'
import { Service } from 'typedi'

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

  public async getAll(): Promise<ProfileEntity[]> {
    const data = await this.dbCollection.find().toArray()

    if (!data) {
      throw new Error(`Cannot retrieve data`)
    }

    let arr: ProfileEntity[] = []
    data.map((element: ProfileEntity) => {
        arr.push(new ProfileEntity(
          element.name,
          element.age,
          element.address,
          element.created_date,
          element.updated_date,
          element._id,
          ))
    })
    return arr
  }

  public async getById(id: string): Promise<ProfileEntity> {
    let data = await this.dbCollection.findOne({ _id: id })

    if (!data) {
      throw new Error(`Cannot find profile with id ${id}}`)
    }

    return new ProfileEntity(
      data.name,
      data.age,
      data.address,
      data.created_date,
      data.updated_date,
      data._id,
      )
  }

  // TODO: Do you want to always update name, age and address?
  // TODO: Make sure that name, age and address is not undefined at runtime
  public async insert(
    profile: ProfileEntity
  ): Promise<void> {
    try {
      let res = await this.dbCollection.insertOne(
        {
          $currentDate: { updated_date: true, created_date: true },
          $set: {
            name: profile.name,
            age: profile.age,
            address: profile.address
          }
        }
      )
    } catch (err) {
      console.log('Insert failed: ', err)
    }
  }

  public async update(id: string, update: ProfileEntity): Promise<void> {
    try {
      let res = await this.dbCollection.updateOne(
        {"_id": id},
        {
          $currentDate: {updated_date: true},
          $set: {
            ...update
          }
        }
      )
    } catch (err) {
      console.log("Update failed: ", err)
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
