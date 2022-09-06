import Container from "typedi";
import { ProfileDbAdapter } from "../adapters/profileDb-adapter";
import { config } from "./config";

const InitContainer = async () => {
  const dbConnection = new ProfileDbAdapter(config.mongoConfig);
  await dbConnection.connect();

  Container.set("ProfileDbDi", dbConnection);
};

export { InitContainer };
