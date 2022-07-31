import express from 'express'
import Joi, { string } from 'joi'
import { Container } from 'typedi'

import { ProfileUseCase } from '../../useCases/profile-usecases'

const inputSchema = Joi.object({
  name: Joi.string(),
  age: Joi.number,
  address: Joi.array().items(string)
})

export const profileRoute = express.Router()

// TODO: Could refactor, into error handler
// The default error handler => https://expressjs.com/en/guide/using-middleware.html#middleware.error-handling

export const getAllProfileController = async (
  req: express.Request,
  res: express.Response
) => {
  const profileUseCase: ProfileUseCase = Container.get('profileUseCase')
  const profiles = await profileUseCase.getAllProfiles()

    res.status(200).send(profiles) // TODO: Does this one need to call .toJSON()?
}

export const getProfileController = async (
  req: express.Request,
  res: express.Response
) => {
  const profileUseCase: ProfileUseCase = Container.get('profileUseCase')
  const { id } = req.params
  const profile = await profileUseCase.getProfileById(id)
  res.status(200).send(profile)
}

export const postProfileController = async (
  req: express.Request,
  res: express.Response
) => {

    if (Object.keys(req.body).length <= 0) {
      res.status(500).send("No input data")
    } 
    const { name, age, address } = req.body
    inputSchema.validate({name, age, address})

    const profileUseCase: ProfileUseCase = Container.get('profileUseCase')
    await profileUseCase.createProfile(name, age, address)

    res.status(201).send({ status: 'SUCCESS' })
}

export const putProfileController = async (
  req: express.Request,
  res: express.Response
) => {
  const profileUseCase: ProfileUseCase = Container.get('profileUseCase')
  // TODO: Validate not sufficient enough
  // Could use lib like joi + middleware to
  // https://joi.dev/api/?v=17.6.0 => Joi
  // https://expressjs.com/en/guide/using-middleware.html => Middleware
  if (Object.keys(req.body).length <= 0) {
    res.status(500).send('No input data')
  } else {
    const { id } = req.params
    const { name, age, address } = req.body
    inputSchema.validate({name, age, address})
    await profileUseCase.updateProfile(id, {name, age, address})

    res.status(201).send({ status: 'SUCCESS' })
  }
}

export const deleteProfileController = async (
  req: express.Request,
  res: express.Response
) => {
  const profileUseCase: ProfileUseCase = Container.get('profileUseCase')
  const { id } = req.params
  await profileUseCase.deleteProfile(id)

    res.status(201).send({ status: `DELETE ${id} SUCCESS` })
}

profileRoute.get('/', getAllProfileController)
profileRoute.get('/:id', getProfileController)
profileRoute.post('/', postProfileController)
profileRoute.put('/:id', putProfileController)
profileRoute.delete('/:id', deleteProfileController)
