import { profile } from "console"
import express from "express"
import { ProfileDbAdapter } from "../../adapters/profileDb-adapter"
import { ProfileUseCase } from "../../useCases/profile-usecases"
import { config } from "../config"

export const profileRoute = express.Router()

export const getAllProfileController = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    // try typeDI lib https://github.com/typestack/typedi
    const profileDbAdapter = new ProfileDbAdapter(config.mongoConfig)
    await profileDbAdapter.connect()
    const profileUseCase = new ProfileUseCase(profileDbAdapter)
    const profiles = await profileUseCase.getAllProfileUseCase()

    res.status(200).send(profiles)
  } catch (err) {
    res.status(500).send(err)
  }
}

export const getProfileController = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params
    const profileDbAdapter = new ProfileDbAdapter(config.mongoConfig)
    await profileDbAdapter.connect()
    const profileUseCase = new ProfileUseCase(profileDbAdapter)
    const profile = await profileUseCase.getDataByIdUseCase(id)
    res.status(200).send(profile.toJSON())
  } catch (err) {
    res.status(500).send(err)
  }
}

export const postProfileController = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    if (Object.keys(req.body).length <= 0) {
      res.status(500).send("No input data")
    } else {
      const { _id, name, age, address } = req.body
      const profileDbAdapter = new ProfileDbAdapter(config.mongoConfig)
      await profileDbAdapter.connect()
      const profileUseCase = new ProfileUseCase(profileDbAdapter)
      await profileUseCase.postDataUseCase(_id, name, age, address)

      res.status(201).send({ status: "SUCCESS" })

    }
  } catch (err) {
    res.status(500).send(err)
  }
}

export const putProfileController = async (req: express.Request, res: express.Response) => {
  try {

    if (Object.keys(req.body).length <= 0) {
      res.status(500).send("No input data")
    } else {
      const { id } = req.params
      const { name, age, address } = req.body
      const profileDbAdapter = new ProfileDbAdapter(config.mongoConfig)
      await profileDbAdapter.connect()
      const profileUseCase = new ProfileUseCase(profileDbAdapter)
      await profileUseCase.putDataUseCase(id, name, age, address)

      res.status(201).send({ status: "SUCCESS" })
    }

  } catch (err) {
    res.status(500).send(err)
  }
}

export const deleteProfileController = async (req: express.Request, res: express.Response) => {
  try {


      const { id } = req.params
      const profileDbAdapter = new ProfileDbAdapter(config.mongoConfig)
      await profileDbAdapter.connect()
      const profileUseCase = new ProfileUseCase(profileDbAdapter)
      await profileUseCase.deleteDataUseCase(id)

      res.status(201).send({ status: `DELETE ${id} SUCCESS` })

  } catch (err) {
    res.status(500).send(err)
  }
}


profileRoute.get("/", getAllProfileController)
profileRoute.get("/:id", getProfileController)
profileRoute.post("/", postProfileController)
profileRoute.put("/:id", putProfileController)
profileRoute.delete("/:id", deleteProfileController)
