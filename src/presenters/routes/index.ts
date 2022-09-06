import express from "express";
import { profileRoute } from "./profile-routes";

export const route = express.Router();

route.get("/", async (req: express.Request, res: express.Response) => {
  res
    .status(200)
    .send(
      "This is the clean-architecture-implemented version. Go to /swagger for doc."
    );
});

route.use("/profile", profileRoute);
