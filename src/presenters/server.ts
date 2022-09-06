import express, { NextFunction } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import methodOverride from "method-override";

import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "../swagger.json";
import { route } from "./routes/index";

export const createServer = () => {
  const server = express();

  server.use(cors());
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  server.use(methodOverride());
  server.use(
    (
      err: Error,
      req: express.Request,
      res: express.Response,
      next: NextFunction
    ) => {
      res.status(500);
      res.render("error ", { error: err.message });
      next();
    }
  );

  server.use(route);

  return server;
};
