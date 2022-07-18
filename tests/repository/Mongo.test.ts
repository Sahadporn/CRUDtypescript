// import { MongoClient, ObjectId } from "mongodb"
// import { Profile } from "../../entity/Profile"
// import { MongoRepo } from "../../repositories/mongorepo"

// const mongoConfig = {
//   user: "root",
//   password: "root",
//   host: "localhost",
//   port: 27017,
//   db: "test",
// }

// const repo = new MongoRepo(mongoConfig)

// const uri = "mongodb://root:root@localhost:27017/"
// const client = new MongoClient(uri)
// ;async () => {
//   await client.connect()
// }
// const db = client.db("test")
// const profile = db.collection("profile")

// const jsonProfiles = [
//   {
//     _id: "924927",
//     name: "Mary",
//     age: 12,
//     address: ["society", "usa"],
//     created_date: new Date(2018, 11, 24, 10, 33, 30, 0),
//     updated_date: new Date(2018, 11, 24, 10, 33, 30, 0),
//   },
//   {
//     _id: "923618",
//     name: "John",
//     age: 16,
//     address: ["society", "usa"],
//     created_date: new Date(2018, 12, 30, 10, 33, 30, 0),
//     updated_date: new Date(2018, 12, 30, 10, 33, 30, 0),
//   },
// ]

// describe("Testing repository", () => {
//   beforeAll(async () => {
//     await profile.insertMany([
//       {
//         _id: "924927",
//         name: "Mary",
//         age: 12,
//         address: ["society", "usa"],
//         created_date: new Date(2018, 11, 24, 10, 33, 30, 0),
//         updated_date: new Date(2018, 11, 24, 10, 33, 30, 0),
//       },
//       {
//         _id: "923618",
//         name: "John",
//         age: 16,
//         address: ["society", "usa"],
//         created_date: new Date(2018, 12, 30, 10, 33, 30, 0),
//         updated_date: new Date(2018, 12, 30, 10, 33, 30, 0),
//       },
//     ] as any)
//   })
//   afterAll(async () => {
//     await profile.deleteMany({})
//     client.close()
//   })

//   test("find all data", async () => {
//     // let result = await repo.getAllData()
//     await expect(repo.getAllData()).resolves.toEqual(JSON.stringify(jsonProfiles))
//   })
//   test("find one data with id", async () => {
//     // let result = await repo.getDataById({ _id: "924927" })
//     await expect(repo.getDataById({ _id: "924927" })).resolves.toEqual(jsonProfiles[0])
//   })
// })
