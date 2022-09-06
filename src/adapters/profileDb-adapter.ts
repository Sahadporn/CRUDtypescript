import { Collection, MongoClient, ObjectId } from "mongodb";
import { ProfileEntity } from "../entities/Profile-entity";
import { ProfileDbInterface } from "../useCases/profile-usecases";
import { Service } from "typedi";

type DbConfig = {
  user: string;
  password: string;
  host: string;
  port: number;
  db: string;
  collection: string;
};

type ProfileCollection = Collection<
  Omit<ProfileEntity, "id" | "createdAt" | "updatedAt"> & {
    _id: ObjectId;
    created_at: Date;
    updated_at: Date;
  }
>;

@Service()
export class ProfileDbAdapter implements ProfileDbInterface {
  private dbCollection?: ProfileCollection;
  private readonly dbConfig: DbConfig;

  constructor(dbConfig: DbConfig) {
    this.dbConfig = dbConfig;
  }

  public async connect(): Promise<void> {
    let uri = `mongodb://${this.dbConfig.user}:${this.dbConfig.password}@${this.dbConfig.host}:${this.dbConfig.port}/`;

    const connection = await new MongoClient(uri).connect();
    this.dbCollection = connection
      .db(this.dbConfig.db)
      .collection(this.dbConfig.collection);
  }

  public async getAll(): Promise<ProfileEntity[]> {
    const data = await (this.dbCollection as ProfileCollection)
      .find()
      .toArray();

    return data.map((profile) => {
      return new ProfileEntity(
        profile.name,
        profile.age,
        profile.address,
        profile.created_at,
        profile.updated_at,
        profile._id.toHexString()
      );
    });
  }

  public async getById(id: string): Promise<ProfileEntity> {
    const data = await (this.dbCollection as ProfileCollection).findOne({
      _id: new ObjectId(id),
    });

    if (!data) {
      throw new Error(`Cannot find profile with id ${id}}`);
    }

    return new ProfileEntity(
      data.name,
      data.age,
      data.address,
      data.created_at,
      data.updated_at,
      data._id.toHexString()
    );
  }

  public async insert(profile: ProfileEntity): Promise<void> {
    await (this.dbCollection as ProfileCollection).insertOne({
      _id: new ObjectId(),
      name: profile.name,
      age: profile.age,
      address: profile.address,
      updated_at: new Date(),
      created_at: new Date(),
    });
  }

  public async update(update: ProfileEntity): Promise<void> {
    await (this.dbCollection as ProfileCollection).updateOne(
      { _id: new ObjectId(update.id) },
      {
        $currentDate: { updated_date: true },
        $set: {
          name: update.name,
          age: update.age,
          address: update.address,
        },
      }
    );
  }

  public async delete(id: string): Promise<void> {
    await (this.dbCollection as ProfileCollection).deleteOne({
      _id: new ObjectId(id),
    });
  }
}
