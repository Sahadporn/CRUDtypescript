import { getAllProfileUseCase, getDataByIdUseCase } from "../../useCases/profile-usecases";
import {jest} from '@jest/globals';
import { MemRepo } from "../../repositories/memrepo";

const jsonProfiles = [{
    _id: "924927",
    name: "Mary",
    age: 12,
    address: ["society", "usa"],
    created_date: new Date(2018, 11, 24, 10, 33, 30, 0),
    updated_date: new Date(2018, 11, 24, 10, 33, 30, 0),
  },{
    _id: "923618",
    name: "John",
    age: 16,
    address: ["society", "usa"],
    created_date: new Date(2018, 12, 30, 10, 33, 30, 0),
    updated_date: new Date(2018, 12, 30, 10, 33, 30, 0),
  }]

// jest.mock("../../repositories/memrepo", () => {
//     return {
//         getAllData: jest.fn().mockImplementation(() => {
//             return jsonProfiles
//         }),
//         getDataById: jest.fn().mockImplementation(() => {

//         })
//     }
// })
// // const mockGetAllData = jest.fn(() => jsonProfiles)
// // const mockGetDataById = jest.fn(n => jsonProfiles[0])

// // const repo = jest.fn().mockImplementation(() => {
// //     return {
// //         getAllData: mockGetAllData,
// //         getDataById: mockGetDataById
// //     }
// // })

let repo = new MemRepo(jsonProfiles)

describe("Test for use cases", () => {
    // beforeEach(() => {
    //     // Reset "amount of times called" back to 0 for each test
    //     jest.clearAllMocks()
    // })
    
    test("get all data", () => {
        let result = getAllProfileUseCase(repo)

        expect(result).toEqual(jsonProfiles)
    })
    test("get data by id", () => {
        let result = getDataByIdUseCase(repo, "924927")

        expect(result).toEqual(jsonProfiles[0])
    })
})
