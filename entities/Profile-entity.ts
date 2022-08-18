import { ProfileInterface } from './Interface'

export class ProfileEntity implements ProfileInterface {
  constructor(
    public name: string,
    public age: number,
    public address: string[],
    public created_date: Date,
    public updated_date: Date,
    public id?: string
  ) {
    this.id = id
    this.name = name
    this.age = age
    this.address = address
    this.created_date = created_date
    this.updated_date = updated_date
  }
}
