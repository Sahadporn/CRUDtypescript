import { ProfileEntity } from "../entity/Profile-entity"

export interface ProfileDbInterface {
    getAllData(): Promise<ProfileEntity[]>
    getDataById(id: string): Promise<ProfileEntity>
}

export class ProfileUseCase {
    private readonly profileDb: ProfileDbInterface

    constructor(profileDb: ProfileDbInterface) {
        this.profileDb = profileDb
    }

    public async getAllProfileUseCase(): Promise<ProfileEntity[]> {
        return await this.profileDb.getAllData()
    }

    public async getDataByIdUseCase(id: string): Promise<ProfileEntity> {
        return this.profileDb.getDataById(id)
    }
}
