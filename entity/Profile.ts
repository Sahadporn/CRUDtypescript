import {ProfileInterface} from "./Interface";

export class Profile implements ProfileInterface {
    constructor(public _id: string, public name: string, public age: number, public address: string[], public created_date: Date, public updated_date: Date) {
        this._id = _id
        this.name = name
        this.age = age
        this.address = address
        this.created_date = created_date
        this.updated_date = updated_date
    }

   /**
    * toJson
    */
   public toJson() {
    return JSON.stringify(this)
   }

}