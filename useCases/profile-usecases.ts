import { ProfileEntity } from '../entity/Profile-entity'
import { Container, Inject, Service } from 'typedi'
import { ProfileDbAdapter } from '../adapters/profileDb-adapter'
export interface ProfileDbInterface {
  getAll(): Promise<ProfileEntity[]>
  getById(id: string): Promise<ProfileEntity>
  insert(profile: ProfileEntity): Promise<void>
  update(id: string, update: ProfileEntity): Promise<void>
  delete(id: string): Promise<void>
}

@Service()
export class ProfileUseCase {

  constructor(
    @Inject('ProfileDbDi')
    private readonly profileDb: ProfileDbAdapter 
  ) {
    this.profileDb.connect()
  }

  public async getAllProfiles(): Promise<ProfileEntity[]> {
    return await this.profileDb.getAll()
  }

  public async getProfileById(id: string): Promise<ProfileEntity> {
    return await this.profileDb.getById(id)
  }

  public async createProfile(
    name: string,
    age: number,
    address: string[]
  ) {
    let profile = new ProfileEntity(name, age, address, new Date(), new Date())
    return await this.profileDb.insert(profile)
  }

  // TODO: Not all field want to update, some could be undefined at runtime
  public async updateProfile(
    id: string,
    update: Partial<{
      name: string
      age: number
      address: string[]
    }>
  ) {
    // TODO: update within ProfileEntity first then send it to update function
    const profile = await this.profileDb.getById(id)
    for (let element in update) {
      if (element !== undefined) {
        let key = element as keyof {
          name: string
          age: number
          address: string[]
        }
        (profile[key] as any) = update[key]
      }
    }

    return await this.profileDb.update(id, profile)
  }

  public async deleteProfile(id: string) {
    return await this.profileDb.delete(id)
  }
}
