import { ModelStatic } from "sequelize";
import { IHaveStaticAssociate } from "../model/core/IHaveStaticAssociate";
import { EventDefinition } from "../model/EventDefinition";
import { EventDefinitionTrainer } from "../model/EventDefinitionTrainer";
import { EventInstance } from "../model/EventInstance";
import { EventInstanceTrainer } from "../model/EventInstanceTrainer";
import { EventRegistration } from "../model/EventRegistration";
import { Session } from "../model/Session";
import { User } from "../model/User";
import { UserBankAccount } from "../model/UserBankAccount";
import { UserContactOptions } from "../model/UserContactOptions";
import { UserGrading } from "../model/UserGrading";
import { UserGuardian } from "../model/UserGuardian";
import { UserInvite } from "../model/UserInvite";
import { UserLoginFailAttempt } from "../model/UserLoginFailAttempt";
import { UserProfile } from "../model/UserProfile";
import { UserRole } from "../model/UserRole";
import { UserTrialTraining } from "../model/UserTrialTraining";

export const initializeModels = async (alter: boolean) => {
  const models: IHaveStaticAssociate[] = [
    Session,
    User,
    UserProfile,
    UserRole,
    UserBankAccount,
    UserContactOptions,
    UserGrading,
    UserGuardian,
    UserLoginFailAttempt,
    UserInvite,
    UserTrialTraining,
    EventDefinition,
    EventDefinitionTrainer,
    EventInstance,
    EventInstanceTrainer,
    EventRegistration,
  ];

  // create associations
  models.forEach((model) => model.associate());

  // sync model
  models.forEach(
    async (model) =>
      await (model as unknown as ModelStatic<any>).sync({ alter })
  );
};
