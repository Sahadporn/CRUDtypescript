import { ProfileEntity } from '../entity/Profile-entity'
import 'reflect-metadata' //TODO: Remove this
import { Container, Inject, Service } from 'typedi'
import { ProfileDbAdapter } from '../adapters/profileDb-adapter'
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

// TODO: Clean unused code
// @Service("profileUseCase")
@Service()
export class ProfileUseCase {
  // private readonly profileDb: ProfileDbInterface

  // constructor(profileDb: ProfileDbInterface) {
  //   this.profileDb = profileDb
  // }

  constructor(
    @Inject('ProfileDbDi')
    public profileDb: ProfileDbAdapter //TODO: Should be private readonly
  ) {
    this.profileDb.connect()
  }

  // TODO: Rename getAllProfiles
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

  // TODO: Rename getProfileById
  public async getDataByIdUseCase(id: string): Promise<ProfileEntity> {
    return await this.profileDb.getById(id)
  }

  // TODO: Should not receive Id
  // TODO: Rename createProfile
  public async postDataUseCase(
    id: string,
    name: string,
    age: number,
    address: string[]
  ) {
    // TODO: Could have create ProfileEntity first
    return await this.profileDb.insert(id, name, age, address)
  }

  // TODO: Rename updateProfile
  // TODO: Could Refactor parameter into two groups, (id, update: Partial<UpdateObject>)
  // TODO: Not all field want to update, some could be undefined at runtime
  public async putDataUseCase(
    id: string,
    update: Partial<{
      name: string
      age: number
      address: string[]
    }>
  ) {
    // TODO: update within ProfileEntity first then send it to update function
    const profile = await this.profileDb.getById(id)

    return await this.profileDb.insert(id, name, age, address) // TODO: Should be update?
  }

  // TODO: Rename deleteProfile
  public async deleteDataUseCase(id: string) {
    return await this.profileDb.delete(id)
  }
}
