import express from "express";
import { UserController } from "./controllers/UserController";
import { UserProfileController } from "./controllers/UserProfileController";
import { Session } from "./model/Session";
import { User } from "./model/User";
import { UserBankAccount } from "./model/UserBankAccount";
import { UserGrading } from "./model/UserGrading";
import { UserProfile } from "./model/UserProfile";
import { UserRole } from "./model/UserRole";
import { createRootUser } from "./utils/createRootUser";

const initialize = async () => {
  const alter: boolean = false;
  Session.sync({ alter: alter });
  User.sync({ alter: alter });
  UserProfile.sync({ alter: alter });
  UserRole.sync({ alter: alter });
  UserGrading.sync({ alter: alter });
  UserBankAccount.sync({ alter: alter });

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

server.use("/api", new UserController().router);
server.use("/api", new UserProfileController().router);
server.listen(5000);