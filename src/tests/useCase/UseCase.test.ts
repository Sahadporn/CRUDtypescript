// import { ProfileUseCase } from '../../useCases/profile-usecases';
// import {jest} from '@jest/globals';
// import { ProfileDbAdapter } from '../../adapters/profileDb-adapter';

// const jsonProfiles = [{
//     _id: "924927",
//     name: "Mary",
//     age: 12,
//     address: ["society", "usa"],
//     created_date: new Date(2018, 11, 24, 10, 33, 30, 0),
//     updated_date: new Date(2018, 11, 24, 10, 33, 30, 0),
//   },{
//     _id: "923618",
//     name: "John",
//     age: 16,
//     address: ["society", "usa"],
//     created_date: new Date(2018, 12, 30, 10, 33, 30, 0),
//     updated_date: new Date(2018, 12, 30, 10, 33, 30, 0),
//   }]

// // jest.mock("../../repositories/memrepo", () => {
// //     return {
// //         getAllData: jest.fn().mockImplementation(() => {
// //             return jsonProfiles
// //         }),
// //         getDataById: jest.fn().mockImplementation(() => {

// //         })
// //     }
// // })
// // // const mockGetAllData = jest.fn(() => jsonProfiles)
// // // const mockGetDataById = jest.fn(n => jsonProfiles[0])

// // // const repo = jest.fn().mockImplementation(() => {
// // //     return {
// // //         getAllData: mockGetAllData,
// // //         getDataById: mockGetDataById
// // //     }
// // // })

// // const mockDb = jest.fn()
// // jest.mock("../../adapters/profileDb-adapter", () => {
// //     return jest.fn().mockImplementation(() => {
// //         return {mockdb: mockDb};
// // })
// // })

// const mockedDb = require("../../adapters/profileDb-adapter")()
// jest.mock("../../adapters/profileDb-adapter")

// describe("Test for use cases", () => {
//     const profileUseCase = new ProfileUseCase(mockedDb)
    
//     beforeEach(() => {
//         // Reset "amount of times called" back to 0 for each test
//         jest.clearAllMocks()
//         mockedDb.getAll().mockImplementation(() => {
//             return jsonProfiles
//         })
//         mockedDb.getById().mockImplementation(() => {
//             return jsonProfiles[0]
//         })
//     })
    
//     test("get all profiles", () => {
//         let result = profileUseCase.getAllProfileUseCase()
        
//         expect(result).toEqual(jsonProfiles)
//     })
//     test("get profile by id", () => {
//         let result = profileUseCase.getDataByIdUseCase("924927")

//         expect(result).toEqual(jsonProfiles[0])
//     })
//     test("post profile", () => {
//         let result = profileUseCase.postDataUseCase("211", "Mock dude", 99, ["mock land", "Mocking city"])

//         expect(mockedDb.insert()).toBeCalled()
        
//     })
//     test("put profile", () => {
//         let result = profileUseCase.putDataUseCase("211", "Mock dude", 99, ["mock land", "Mocking city"])

//         expect(mockedDb.insert()).toBeCalled()
//     })
//     test("delete profile", () => {
//         let result = profileUseCase.deleteDataUseCase("211")

//         expect(mockedDb.delete()).toBeCalled()
//     })
// })
