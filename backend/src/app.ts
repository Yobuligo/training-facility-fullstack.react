import express from "express";
import { EventDefinitionController } from "./controllers/EventDefinitionController";
import { EventInstanceController } from "./controllers/EventInstanceController";
import { EventRegistrationController } from "./controllers/EventRegistrationController";
import { UserController } from "./controllers/UserController";
import { UserProfileController } from "./controllers/UserProfileController";
import { initializeModels } from "./db/initializeModels";
import { createRootUser } from "./utils/createRootUser";

const initialize = async () => {
  await initializeModels(false);
  createRootUser();
};

initialize();

const server = express();
server.use(express.json({ limit: "2mb" }));
server.use((_, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

server.use("/api", new EventDefinitionController().router);
server.use("/api", new EventInstanceController().router);
server.use("/api", new EventRegistrationController().router);
server.use("/api", new UserController().router);
server.use("/api", new UserProfileController().router);
server.listen(5000);
