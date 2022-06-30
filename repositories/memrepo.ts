import { Profile } from "../entity/Profile"

export class MemRepo {
  data: {
    _id: string
    name: string
    age: number
    address: string[]
    created_date: Date
    updated_date: Date
  }[]
  constructor(data: {
    _id: string
    name: string
    age: number
    address: string[]
    created_date: Date
    updated_date: Date
  }[]) {
    this.data = data
  }

  /**
   * createProfileObject
   */
  public createProfileObject(result: any) {
    return new Profile(
      result._id,
      result.name,
      result.age,
      result.address,
      result.created_date,
      result.updated_date
    )
  }

  /**
   * getAllData
   */
  public getAllData() {
    return this.data
  }

  /**
   * getDataById
   */
  public getDataById(filter: { _id: string }) {
    for (let profile of this.data) {
      if (profile._id === filter._id) {
        return this.createProfileObject(profile)
      }
    }
  }
}
