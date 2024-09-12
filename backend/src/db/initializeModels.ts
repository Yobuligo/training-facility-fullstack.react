import { SequelizeModel } from './../model/core/SequelizeModel';
import { EventDefinition } from "../model/EventDefinition";
import { EventInstance } from "../model/EventInstance";
import { EventRegistration } from "../model/EventRegistration";
import { Session } from "../model/Session";
import { User } from "../model/User";
import { UserBankAccount } from "../model/UserBankAccount";
import { UserGrading } from "../model/UserGrading";
import { UserProfile } from "../model/UserProfile";
import { UserRole } from "../model/UserRole";
import { db } from "./db";

const models = {
    Session,
    User,
    UserProfile,
    UserRole,
    UserGrading,
    UserBankAccount,
    EventDefinition,
    EventInstance,
    EventRegistration
  };

  
//   // Modelle initialisieren und registrieren
//   Object.values(models).forEach(model => {
//     model.initialize(db);
//   });
  
//   // Beziehungen herstellen
//   Object.values(models).forEach(model => {

//     if (model.associate) {
//       model.associate(models);
//     }
//   });