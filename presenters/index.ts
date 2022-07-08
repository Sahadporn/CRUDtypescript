import express from "express"
import cors from "cors"
import { config } from "./config"

import { profileRoute } from "./routes/profile-routes"

const app = express()
const allowedOrigins = ["http://localhost:3000"]
const options: cors.CorsOptions = {
  origin: allowedOrigins,
}

app.use("")

app.listen(config.port, () =>
  console.log(`App listening on PORT ${config.port}`)
)
