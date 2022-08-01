import express from 'express'
import Joi, { string } from 'joi'
import { Container } from 'typedi'

import { ProfileUseCase } from '../../useCases/profile-usecases'
// import { joiValidator } from '../index'

const inputSchema = Joi.object({
  name: Joi.string(),
  age: Joi.number,
  address: Joi.array().items(Joi.string())
})

export function joiValidator (err: Error, req: express.Request, res: express.Response, next: NextFunction) {
  if (Object.keys(req.body).length <= 0) {
    res.status(500).send("No input data")
  } 
  const { name, age, address } = req.body
  if (inputSchema.validate({name, age, address})) {
    next()
  }
}

export const profileRoute = express.Router()

// TODO: Could refactor, into error handler
// The default error handler => https://expressjs.com/en/guide/using-middleware.html#middleware.error-handling

export const getAllProfileController = async (
  req: express.Request,
  res: express.Response
  ) => {
  const profileUseCase: ProfileUseCase = Container.get(ProfileUseCase)
  const profiles = await profileUseCase.getAllProfiles()

    res.status(200).send(profiles)
}

export const getProfileController = async (
  req: express.Request,
  res: express.Response
) => {
  const profileUseCase: ProfileUseCase = Container.get(ProfileUseCase)
  const { id } = req.params
  const profile = await profileUseCase.getProfileById(id)
  res.status(200).send(profile)
}

export const postProfileController = async (
  req: express.Request,
  res: express.Response
) => {

    const { name, age, address } = req.body

    const profileUseCase: ProfileUseCase = Container.get(ProfileUseCase)
    await profileUseCase.createProfile(name, age, address)

    res.status(201).send({ status: 'SUCCESS' })
}

export const putProfileController = async (
  req: express.Request,
  res: express.Response
) => {
  const profileUseCase: ProfileUseCase = Container.get(ProfileUseCase)
  // TODO: Validate not sufficient enough
  // Could use lib like joi + middleware to
  // https://joi.dev/api/?v=17.6.0 => Joi
  // https://expressjs.com/en/guide/using-middleware.html => Middleware
 
    const { id } = req.params
    const { name, age, address } = req.body
    await profileUseCase.updateProfile(id, {name, age, address})

    res.status(201).send({ status: 'SUCCESS' })
  }

export const deleteProfileController = async (
  req: express.Request,
  res: express.Response
) => {
  const profileUseCase: ProfileUseCase = Container.get(ProfileUseCase)
  const { id } = req.params
  await profileUseCase.deleteProfile(id)

    res.status(201).send({ status: `DELETE ${id} SUCCESS` })
}

profileRoute.get('/', getAllProfileController)
profileRoute.get('/:id', getProfileController)
profileRoute.post('/', joiValidator, postProfileController)
profileRoute.put('/:id', joiValidator, putProfileController)
profileRoute.delete('/:id', deleteProfileController)
