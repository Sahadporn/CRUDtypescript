import express from "express"
import cors from "cors"
import { config } from "./config"
import bodyParser from "body-parser"
;-bodyParser
import { profileRoute } from "./routes/profile-routes"
import swaggerUi from "swagger-ui-express"
import * as swaggerDocument from "../swagger.json"

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
    res.status(200).send("This is the clean-architecture-implemented version. Go to /swagger for doc.")
})

app.use("/student", profileRoute)

app.listen(config.port, () =>
  console.log(`App listening on PORT ${config.port}`)
)
