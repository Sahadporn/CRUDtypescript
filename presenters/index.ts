import "reflect-metadata"

import express, { NextFunction } from "express"
import cors from "cors"
import { config } from "./config"
import bodyParser from "body-parser"
import methodOverride from "method-override"
import Joi, { string } from 'joi'

import { profileRoute } from "./routes/profile-routes"
import swaggerUi from "swagger-ui-express"
import * as swaggerDocument from "../swagger.json"
import { InitContainer } from "./di"


// const inputSchema = Joi.object({
//   name: Joi.string(),
//   age: Joi.number,
//   address: Joi.array().items(Joi.string())
// })

function errorHandler (err: Error, req: express.Request, res: express.Response, next: NextFunction) {
  res.status(500)
  res.render('error ', { error: err.message })
  next()
}

// export function joiValidator (err: Error, req: express.Request, res: express.Response, next: NextFunction) {
//   if (Object.keys(req.body).length <= 0) {
//     res.status(500).send("No input data")
//   } 
//   const { name, age, address } = req.body
//   if (inputSchema.validate({name, age, address})) {
//     next()
//   }
// }

const initApp = async () => {
  await InitContainer()

  const app = express()
  const allowedOrigins = ["http://localhost:3000"]
  const options: cors.CorsOptions = {
    origin: allowedOrigins,
  }

  
  app.use(cors(options))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

  app.get("/", async (req: express.Request, res) => {
    res
      .status(200)
      .send(
        "This is the clean-architecture-implemented version. Go to /swagger for doc."
      )
  })

  app.use("/student", profileRoute)

  app.use(methodOverride())
  app.use(errorHandler)

  app.listen(config.port, () =>
    console.log(`App listening on PORT ${config.port}`)
  )
}

initApp()
