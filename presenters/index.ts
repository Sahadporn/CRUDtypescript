import 'reflect-metadata'

import express, { NextFunction } from 'express'
import cors from 'cors'
import { config } from './config'
import bodyParser from 'body-parser'
import methodOverride from 'method-override'
import Joi, { string } from 'joi'

import { profileRoute } from './routes/profile-routes'
import swaggerUi from 'swagger-ui-express'
import * as swaggerDocument from '../swagger.json'
import { InitContainer } from './di'

function errorHandler(
  err: Error,
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  res.status(500)
  res.render('error ', { error: err.message })
  next()
}

// TODO: Refactor, this function should only contain API Server creation logic
//
// move  InitContainer & app.listen to outside
// Rename initApp to createServer

const initApp = async () => {
  await InitContainer()

  const app = express()
  // TODO: Move middleware together

  // TODO: Using lib would be better
  // https://expressjs.com/en/resources/middleware/cors.html
  const allowedOrigins = ['http://localhost:3000']
  const options: cors.CorsOptions = {
    origin: allowedOrigins
  }

  app.use(cors(options))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

  // TODO: Move to routes (./routes/index.ts)
  app.get('/', async (req: express.Request, res) => {
    res
      .status(200)
      .send(
        'This is the clean-architecture-implemented version. Go to /swagger for doc.'
      )
  })

  // TODO: change to /profile
  app.use('/profile', profileRoute)

  app.use(methodOverride())
  // TODO: Just implement directly, too little code to move to another function
  app.use(errorHandler)

  app.listen(config.port, () =>
    console.log(`App listening on PORT ${config.port}`)
  )
}

initApp()
