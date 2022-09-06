import express, { NextFunction } from "express";
import { Container } from "typedi";
import Joi from "joi";

import { ProfileEntity } from "../../entities/Profile-entity";
import { ProfileUseCase } from "../../useCases/profile-usecases";

const createSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  age: Joi.number().integer().min(1).max(120).required(),
  address: Joi.array().items(Joi.string()).required(),
});

const updateSchema = Joi.object({
  name: Joi.string().min(2).max(30),
  age: Joi.number().integer().min(1).max(120),
  address: Joi.array().items(Joi.string()),
});

const joiValidator = (schema: Joi.ObjectSchema) => {
  return (req: express.Request, res: express.Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    const valid = error == null;

    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");

      console.log("error", message);
      res.status(422).json({ error: message });
    }
  };
};

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

  const formattedProfiles = profiles.map((profile) => {
    return profileFormatter(profile);
  });

  res.status(200).send(formattedProfiles);
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

export const createProfileController = async (
  req: express.Request,
  res: express.Response
) => {
  const { name, age, address } = req.body;

  const profileUseCase: ProfileUseCase = Container.get(ProfileUseCase);
  await profileUseCase.createProfile(name, age, address);

  res.status(201).send({ status: "SUCCESS" });
};

export const updateProfileController = async (
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
profileRoute.post("/", joiValidator(createSchema), createProfileController);
profileRoute.put("/:id", joiValidator(updateSchema), updateProfileController);
profileRoute.delete("/:id", deleteProfileController);
