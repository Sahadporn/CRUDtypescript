export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGODB_USERNAME: string;
      MONGODB_PASSWORD: string;
      MONGODB_DATABASE: string;
      MONGODB_COLLECTION: string;
      ENV: "test" | "dev" | "prod";
    }
  }
}
