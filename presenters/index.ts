import "reflect-metadata";

import { config } from "./config";

import { InitContainer } from "./di";
import { createServer } from "./server";

const diContainer = async () => await InitContainer();

diContainer();

createServer().listen(config.port, () =>
  console.log(`App listening on PORT ${config.port}`)
);
