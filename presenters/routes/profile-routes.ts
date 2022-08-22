import express, { NextFunction } from "express";
// import Joi from "joi"
import { Container } from "typedi";
import { ProfileEntity } from "../../entities/Profile-entity";

import { ProfileUseCase } from "../../useCases/profile-usecases";

const Joi = require("joi");

const inputSchema = Joi.object({
  name: Joi.string().min(2).max(30),
  age: Joi.number().integer().min(1).max(120),
  address: Joi.array().items(Joi.string()),
});

// const middleware = (schema: any) => {
//   return (req: express.Request, res: express.Response, next: NextFunction) => {
//   const { error } = Joi.validate(req.body, schema);
//   const valid = error == null;

//   if (valid) {
//     next();
//   } else {
//     const { details } = error;
//     const message = details.map(i => i.message).join(',');

//     console.log("error", message);
//    res.status(422).json({ error: message }) }
//   }
// }

// joiValidator runnable but not working
// post method does not call joi middleware
function joiValidator(
  err: Error,
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  console.log("inside joiValidator");
  if (Object.keys(req.body).length <= 0) {
    res.status(500).send("No input data");
  }
  const { name, age, address } = req.body;
  if (Joi.validate({ name, age, address }, inputSchema)) {
    next();
  } else {
    res.status(500).send("Incorrect input data");
  }
}

function profileFormatter(profile: ProfileEntity) {
  return {
    id: profile.id,
    name: profile.name,
    age: profile.age,
    address: profile.address,
    createdAt: profile.createdAt,
    updatedAt: profile.updatedAt,
  };
}

export const getAllProfileController = async (
  req: express.Request,
  res: express.Response
) => {
  const profileUseCase: ProfileUseCase = Container.get(ProfileUseCase);
  let profiles = await profileUseCase.getAllProfiles();

  profiles.map((element) => {
    return profileFormatter(element);
  });

  res.status(200).send(profiles);
};

export const getProfileController = async (
  req: express.Request,
  res: express.Response
) => {
  const profileUseCase: ProfileUseCase = Container.get(ProfileUseCase);
  const { id } = req.params;
  const profile = await profileUseCase.getProfileById(id);
  res.status(200).send(profileFormatter(profile));
};

export const postProfileController = async (
  req: express.Request,
  res: express.Response
) => {
  const { name, age, address } = req.body;

  const profileUseCase: ProfileUseCase = Container.get(ProfileUseCase);
  await profileUseCase.createProfile(name, age, address);

  res.status(201).send({ status: "SUCCESS" });
};

export const putProfileController = async (
  req: express.Request,
  res: express.Response
) => {
  const profileUseCase: ProfileUseCase = Container.get(ProfileUseCase);

  const { id } = req.params;
  const { name, age, address } = req.body;
  await profileUseCase.updateProfile(id, { name, age, address });

  res.status(201).send({ status: "SUCCESS" });
};

export const deleteProfileController = async (
  req: express.Request,
  res: express.Response
) => {
  const profileUseCase: ProfileUseCase = Container.get(ProfileUseCase);
  const { id } = req.params;
  await profileUseCase.deleteProfile(id);

  res.status(201).send({ status: `DELETE ${id} SUCCESS` });
};

export const profileRoute = express.Router();

profileRoute.get("/", getAllProfileController);
profileRoute.get("/:id", getProfileController);
profileRoute.post("/", joiValidator, postProfileController);
profileRoute.put("/:id", putProfileController);
profileRoute.delete("/:id", deleteProfileController);
