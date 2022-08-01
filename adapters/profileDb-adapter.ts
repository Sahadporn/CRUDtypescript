import { Collection, MongoClient, ObjectId } from 'mongodb'
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
  private dbCollection?: Collection<ProfileEntity> // TODO: Don't have to be any
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
    const data = await (this.dbCollection as Collection<ProfileEntity>).find().toArray()

    if (!data) {
      throw new Error(`Cannot retrieve data`)
    }

    let arr: ProfileEntity[] = []
    data.map((element) => {
        arr.push(new ProfileEntity(
          element.name,
          element.age,
          element.address,
          element.created_date,
          element.updated_date,
          element._id.toString(),
          ))
    })
    return arr
  }

  public async getById(id: string): Promise<ProfileEntity> {
    let data = await (this.dbCollection as Collection<ProfileEntity>).findOne({ "_id": new ObjectId(id) })

    if (!data) {
      throw new Error(`Cannot find profile with id ${id}}`)
    }

    return new ProfileEntity(
      data.name,
      data.age,
      data.address,
      data.created_date,
      data.updated_date,
      data._id as unknown as string,
      )
  }

  public async insert(
    profile: ProfileEntity
  ): Promise<void> {
    try {
      let res = await (this.dbCollection as Collection<ProfileEntity>).insertOne(
        {
            name: profile.name,
            age: profile.age,
            address: profile.address,
            updated_date: new Date(),
            created_date: new Date()
        }
      )
    } catch (err) {
      console.log('Insert failed: ', err)
    }
  }

  public async update(id: string, update: ProfileEntity): Promise<void> {
    try {
      let res = await (this.dbCollection as Collection<ProfileEntity>).updateOne(
        {"_id": new ObjectId(id)},
        {
          $currentDate: {updated_date: true},
          $set: {
            name: update.name,
            age: update.age,
            address: update.address
          }
        }
      )
    } catch (err) {
      console.log("Update failed: ", err)
    }
  }

  public async delete(id: string): Promise<void> {
    try {
      let res = await (this.dbCollection as Collection<ProfileEntity>).deleteOne({ "_id": new ObjectId(id)})
    } catch (err) {
      console.log('Deletion failed: ', err)
    }
  }
}
