import {Profile} from "../entity/Profile"

describe("Testing Profile", () => {
    test("test compare the instance of profile", () => {
        let profile = new Profile("924927", "Mary", 12, ["society", "usa"], new Date(2018, 11, 24, 10, 33, 30, 0), new Date(2018, 11, 24, 10, 33, 30, 0))
    })
})
