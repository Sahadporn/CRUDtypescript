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
   public toJSON() {
    return {
        _id: this._id,
        name: this.name,
        age: this.age,
        address: this.address,
        created_date: this.created_date,
        updated_date: this.updated_date,
    }
   }

//    public fromJSON(json: {
//     _id: string,
//     name: string,
//     age: number,
//     address: string[],
//     created_date: Date,
//     updated_date: Date,
//    }) {
//     return new Profile(json._id, json.name, json.age, json.address, json.created_date, json.updated_date)
//    }

}