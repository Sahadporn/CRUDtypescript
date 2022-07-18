import { ProfileEntity } from "../entity/Profile-entity"

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

export class ProfileUseCase {
  private readonly profileDb: ProfileDbInterface

  constructor(profileDb: ProfileDbInterface) {
    this.profileDb = profileDb
  }

  public async getAllProfileUseCase(): Promise<ProfileEntity[]> {
    return await this.profileDb.getAll()
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
