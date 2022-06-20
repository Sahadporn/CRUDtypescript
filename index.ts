import cors from "cors"
import express from "express"
import dotenv from "dotenv"
import swaggerUi from "swagger-ui-express"
import * as swaggerDocument from "./swagger.json"
import { MongoClient, ObjectId } from "mongodb"
import bodyParser from "body-parser"
;-bodyParser

dotenv.config()

const app = express()
const port = process.env.PORT || 3000
const uri = process.env.MONGO_URI || "mongodb://root:root@localhost:27017/"

const allowedOrigins = ['http://localhost:3000']
const options: cors.CorsOptions = {
  origin: allowedOrigins
}

app.use(cors(options))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

//Connect to mongodb
const client = new MongoClient(uri)
;async () => {
  await client.connect()
}
const db = client.db("student")
const profile = db.collection("profile")

interface Profile {
  _id: ObjectId,
  name: string,
  age: number,
  address: string[],
  created_date: Date,
  updated_date: Date,
}

function convertToObject(body: any): Profile {
  return {
    _id: <ObjectId> body._id,
    name: <string> body.name,
    age: <number> body.age,
    address: <string[]> body.address,
    created_date: new Date(),
    updated_date: new Date(),
  }
}

app.get("/", async (req: express.Request, res) => {
    res.status(200).send("Welcome please go to /swagger")
})

// GET all student data
app.get("/student", async (req: express.Request, res) => {
  try {
    let result = await profile.find().toArray()

    res.status(200).send(JSON.stringify(result))
  } catch (err) {
    res.status(500).send(err)
  }
})

// GET data by id
app.get("/student/:id", async (req: express.Request, res: express.Response) => {
  try {
    let result = await profile.findOne({ _id: req.params.id })

    res.status(200).send(result)
  } catch (error) {
    res.status(500).send(error)
  }
})

// POST student data
app.post("/student", async (req: express.Request, res: express.Response) => {
  try {
    if (Object.keys(req.body).length <= 0) {
      res.status(500).send("No input data")
    } else {
      let data: Profile = convertToObject(req.body)
      await profile.insertOne(data)
    }

    res.status(201).send({ status: "SUCCESS" })
  } catch (error) {
    res.status(500).send(error)
  }
})

// PUT student data
app.put("/student/:id", async (req: express.Request, res: express.Response) => {
  try {
    if (Object.keys(req.body).length <= 0) {
      res.status(500).send("No input data")
    } else {
      await profile.updateOne(
        { _id: req.params.id },
        {
          $currentDate: {
            updated_date: true,
          },
          $set: req.body,
        }
      )
    }

    res.status(201).send({ status: `UPDATE ${req.params.id} SUCCESS` })
  } catch (error) {
    res.status(500).send(error)
  }
})

// DELETE student data
app.delete(
  "/student/:id",
  async (req: express.Request, res: express.Response) => {
    try {
      await profile.deleteOne({ _id: req.params.id })

      res.status(201).send({ status: `DELETE ${req.params.id} SUCCESS` })
    } catch (error) {
      res.status(500).send(error)
    }
  }
)

// DELETE all data
app.delete("/keepout", async (req: express.Request, res: express.Response) => {
  try {
    await profile.deleteMany({})

    res.status(201).send({ status: "DELETE ALL DATA SUCCESS" })
  } catch (error) {
    res.status(500).send(error)
  }
})

app.listen(port, () => console.log(`App listening on PORT ${port}`))
