import "dotenv/config";

export const config = {
  port: 3000,
  mongoConfig: {
    user: process.env.MONGODB_USERNAME ?? "",
    password: process.env.MONGODB_PASSWORD ?? "",
    host: "localhost",
    port: 27017,
    db: process.env.MONGODB_DATABASE ?? "",
    collection: process.env.MONGODB_COLLECTION ?? "",
  },
};

// process.env.
