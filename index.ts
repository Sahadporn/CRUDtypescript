// import cors from "cors"
// import express from "express"
// import bodyParser from "body-parser"
// ;-bodyParser
// import { MongoRepo } from "./repositories/mongorepo";
// import {getAllProfileUseCase, getDataByIdUseCase} from "./useCases/profile-usecases"

// const app = express()
// const port = 3000
// const allowedOrigins = ['http://localhost:3000']
// const options: cors.CorsOptions = {
//   origin: allowedOrigins
// }

// app.use(cors(options))
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }))

// const mongoConfig = {
//     "user": "root",
//     "password": "root",
//     "host": "localhost",
//     "port": 27017,
//     "db": "student"
// }

// const repo = new MongoRepo(mongoConfig)

// app.get("/", async (req: express.Request, res) => {
//     res.status(200).send("This is the clean-architecture-implemented version")
// })

// // GET all student data
// app.get("/student", async (req: express.Request, res) => {
//     try {
//         let response = await getAllProfileUseCase(repo)

//         res.status(200).send(response)
//     } catch (err) {
//       res.status(500).send(err)
//     }
//   })

// app.get("/student/:id", async (req: express.Request, res: express.Response) => {
//     try {
//       let result = await getDataByIdUseCase(repo, req.params.id)
  
//       res.status(200).send(result)
//     } catch (error) {
//       res.status(500).send(error)
//     }
//   })

// app.listen(port, () => console.log(`App listening on PORT ${port}`))
