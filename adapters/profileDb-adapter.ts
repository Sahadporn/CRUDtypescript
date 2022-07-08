import { Collection, MongoClient } from "mongodb";
import { ProfileEntity } from "../entity/Profile-entity";
import { ProfileDbInterface } from "../useCases/profile-usecases";

type DbConfig = {
    user: string
    password: string
    host: string
    port: number
    db: string
    collection: string
  }

export class ProfileAdapter implements ProfileDbInterface {
    private dbCollection: Collection<ProfileEntity> | any
    private readonly dbConfig: DbConfig

    constructor(dbConfig: DbConfig) {
        this.dbConfig = dbConfig
    }

    public async connect(): Promise<void> {
        let uri = `mongodb://${this.dbConfig.user}:${this.dbConfig.password}@${this.dbConfig.host}:${this.dbConfig.port}/`

        const connection = await new MongoClient(uri).connect()
        this.dbCollection = connection.db(this.dbConfig.db).collection(this.dbConfig.collection)
    }

    public createProfileObject(result: any) {
        return new ProfileEntity(result._id, result.name, result.age, result.address, result.created_date, result.updated_date)
      }

    public async getAllData(): Promise<ProfileEntity[]> {
        const data = await this.dbCollection.find().toArray()

        if (!data) {
            throw new Error(`Cannot retrieve data`)
        }

        let arr: ProfileEntity[] = []
        data.forEach((element: ProfileEntity) => {
            arr.push(this.createProfileObject(element))
        });
        return arr
    }
    
    public async getDataById(id: string): Promise<ProfileEntity> {
        let data = await this.dbCollection.findOne({id})

        if (!data) {
            throw new Error(`Cannot find profile with id ${id}}`)
          }

        return this.createProfileObject(data)
    }
}
