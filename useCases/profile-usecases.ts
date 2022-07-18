import { ProfileEntity } from "../entity/Profile-entity"
import "reflect-metadata"
import {Container, Inject, Service} from "typedi"
import { ProfileDbAdapter } from "../adapters/profileDb-adapter"
export interface ProfileDbInterface {
  getAll(): Promise<ProfileEntity[]>
  getById(id: string): Promise<ProfileEntity>
  insert(
    id: string,
    name: string,
    age: number,
    address: string[]
  ): Promise<void>
  delete(id: string): Promise<void>
}

// @Service("profileUseCase")
@Service()
export class ProfileUseCase {
  // private readonly profileDb: ProfileDbInterface

  // constructor(profileDb: ProfileDbInterface) {
  //   this.profileDb = profileDb
  // }
  
  constructor(
    @Inject("ProfileDbDi")
    public profileDb: ProfileDbAdapter
    ) {this.profileDb.connect()}

  public async getAllProfileUseCase() /*: Promise<ProfileEntity[]>*/ {
    return await this.profileDb.getAll()
    // try {
    //   console.log(this.profileDb, "\nXXXXXXXXXXX")
    //   console.log(typeof this.profileDb)
    //   return await this.profileDb.getAll()
    // } catch (error) {
    //   console.log(error)
    // }
  }

  public async getDataByIdUseCase(id: string): Promise<ProfileEntity> {
    return await this.profileDb.getById(id)
  }

  public async postDataUseCase(
    id: string,
    name: string,
    age: number,
    address: string[]
  ) {
    return await this.profileDb.insert(id, name, age, address)
  }

  public async putDataUseCase(
    id: string,
    name: string,
    age: number,
    address: string[]
  ) {
    return await this.profileDb.insert(id, name, age, address)
  }

  public async deleteDataUseCase(id: string) {
    return await this.profileDb.delete(id)
  }
}
