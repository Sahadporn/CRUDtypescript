import { ProfileEntity } from "../../entity/Profile-entity"

const profile1 = new ProfileEntity("924927", "Mary", 12, ["society", "usa"], new Date(2018, 11, 24, 10, 33, 30, 0), new Date(2018, 11, 24, 10, 33, 30, 0))
const jsonProfile = {
  _id: "924927",
  name: "Mary",
  age: 12,
  address: ["society", "usa"],
  created_date: new Date(2018, 11, 24, 10, 33, 30, 0),
  updated_date: new Date(2018, 11, 24, 10, 33, 30, 0),
}

describe("Testing Profile", () => {
  test("test profile init", () => {
    expect(profile1._id).toBe("924927")
    expect(profile1.name).toBe("Mary")
    expect(profile1.age).toBe(12)
    expect(profile1.address).toEqual(["society", "usa"])
    expect(profile1.created_date).toEqual(new Date(2018, 11, 24, 10, 33, 30, 0))
    expect(profile1.updated_date).toEqual(new Date(2018, 11, 24, 10, 33, 30, 0))
  })
  test("test profile to json", () => {
    expect(profile1.toJSON()).toMatchObject(jsonProfile)
  })
  test("test compare the instance of profile", () => {
    let profile2 = new ProfileEntity("924927", "Mary", 12, ["society", "usa"], new Date(2018, 11, 24, 10, 33, 30, 0), new Date(2018, 11, 24, 10, 33, 30, 0))
    
    expect(profile2).toMatchObject(profile1)
  })
})
