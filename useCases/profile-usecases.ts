import { ProfileEntity } from "../entities/Profile-entity";
import { Container, Inject, Service } from "typedi";
import { ProfileDbAdapter } from "../adapters/profileDb-adapter";
export interface ProfileDbInterface {
  getAll(): Promise<ProfileEntity[]>;
  getById(id: string): Promise<ProfileEntity>;
  insert(profile: ProfileEntity): Promise<void>;
  update(update: ProfileEntity): Promise<void>;
  delete(id: string): Promise<void>;
}

@Service()
export class ProfileUseCase {
  constructor(
    @Inject("ProfileDbDi")
    private readonly profileDb: ProfileDbAdapter
  ) {
    this.profileDb.connect();
  }

  public async getAllProfiles(): Promise<ProfileEntity[]> {
    return await this.profileDb.getAll();
  }

  public async getProfileById(id: string): Promise<ProfileEntity> {
    return await this.profileDb.getById(id);
  }

  public async createProfile(name: string, age: number, address: string[]) {
    let profile = new ProfileEntity(name, age, address, new Date(), new Date());
    return await this.profileDb.insert(profile);
  }

  public async updateProfile(
    id: string,
    update: Partial<{
      name: string;
      age: number;
      address: string[];
    }>
  ) {
    const profile = await this.profileDb.getById(id);
    for (const element in update) {
      if (element !== undefined) {
        const key = element as keyof Pick<
          ProfileEntity,
          "name" | "age" | "address"
        >;
        (profile[key] as any) = update[key];
      }
    }

    return await this.profileDb.update(profile);
  }

  public async deleteProfile(id: string) {
    return await this.profileDb.delete(id);
  }
}
