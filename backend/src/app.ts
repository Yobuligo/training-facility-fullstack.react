import express from "express";
import session from "express-session";
import { AppConfig } from "./AppConfig";
import { EventDefinitionController } from "./controllers/EventDefinitionController";
import { EventInstanceController } from "./controllers/EventInstanceController";
import { EventRegistrationController } from "./controllers/EventRegistrationController";
import { UserController } from "./controllers/UserController";
import { UserInviteController } from "./controllers/UserInviteController";
import { UserProfileController } from "./controllers/UserProfileController";
import { checkNotNull } from "./core/utils/checkNotNull";
import { initializeModels } from "./db/initializeModels";
import { createRootUser } from "./utils/createRootUser";

const initialize = async () => {
  await initializeModels(false);
  createRootUser();
};

initialize();

const server = express();
server.use(express.json({ limit: "2mb" }));

// add user session
server.use(
  session({
    secret: checkNotNull(AppConfig.serverSessionSecret),
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: false, // use https? Set it e.g. in production to true process.env.NODE_ENV === 'production'
      maxAge:
        1000 *
        60 *
        60 *
        parseInt(checkNotNull(AppConfig.serverSessionExpirationInHours)), // expires in (here e.g. 24 hours)
    },
  })
);

server.use((_, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    checkNotNull(AppConfig.clientHost)
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

server.use("/api", new EventDefinitionController().router);
server.use("/api", new EventInstanceController().router);
server.use("/api", new EventRegistrationController().router);
server.use("/api", new UserController().router);
server.use("/api", new UserProfileController().router);
server.use("/api", new UserInviteController().router);
server.listen(5000);
