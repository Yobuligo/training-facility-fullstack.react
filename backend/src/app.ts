import connectSessionSequelize from "connect-session-sequelize";
import express from "express";
import session from "express-session";
import { AppConfig } from "./AppConfig";
import { EventDefinitionController } from "./controllers/EventDefinitionController";
import { EventInstanceController } from "./controllers/EventInstanceController";
import { EventRegistrationController } from "./controllers/EventRegistrationController";
import { SystemConfigController } from "./controllers/SystemConfigController";
import { TokenController } from "./controllers/TokenController";
import { UserController } from "./controllers/UserController";
import { UserInviteController } from "./controllers/UserInviteController";
import { UserProfileController } from "./controllers/UserProfileController";
import { UserProfileImageController } from "./controllers/UserProfileImageController";
import { UserTrialTrainingController } from "./controllers/UserTrialTrainingController";
import { checkNotNull } from "./core/utils/checkNotNull";
import { db } from "./db/db";
import { initializeModels } from "./db/initializeModels";
import { createRootUser } from "./utils/createRootUser";
import { createSystemConfig } from "./utils/createSystemConfig";

const SequelizeStore = connectSessionSequelize(session.Store);

const initialize = async () => {
  await initializeModels(false);
  createRootUser();
  createSystemConfig();
};

initialize();

const server = express();
server.use(express.json({ limit: "16mb" })); // restrict to 16 MB for e.g. profile images
server.set("trust proxy", 1);

// add user session
server.use(
  session({
    secret: checkNotNull(AppConfig.serverSessionSecret),
    resave: false,
    store: new SequelizeStore({
      db: db,
      table: "sessions",
    }),
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // use https? Set it e.g. in production to true process.env.NODE_ENV === 'production'
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
server.use("/api", new UserProfileImageController().router);
server.use("/api", new UserInviteController().router);
server.use("/api", new UserTrialTrainingController().router);
server.use("/api", new TokenController().router);
server.use("/api", new SystemConfigController().router);

server.listen(5000);
