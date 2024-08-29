import express from "express";
import { UserController } from "./controllers/UserController";
import { Session } from "./model/Session";
import { User } from "./model/User";
import { UserBankAccount } from "./model/UserBankAccount";
import { UserGrading } from "./model/UserGrading";
import { UserRole } from "./model/UserRole";

Session.sync({ alter: true });
User.sync({ alter: true });
UserRole.sync({ alter: true });
UserGrading.sync({ alter: true });
UserBankAccount.sync({ alter: true });

// addAdminUser()

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
server.listen(5000);
