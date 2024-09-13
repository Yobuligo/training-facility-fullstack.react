import { ModelStatic } from "sequelize";
import { IHaveStaticAssociate } from "../model/core/IHaveStaticAssociate";
import { EventDefinition } from "../model/EventDefinition";
import { EventInstance } from "../model/EventInstance";
import { EventRegistration } from "../model/EventRegistration";
import { Session } from "../model/Session";
import { User } from "../model/User";
import { UserBankAccount } from "../model/UserBankAccount";
import { UserGrading } from "../model/UserGrading";
import { UserInvite } from "../model/UserInvite";
import { UserProfile } from "../model/UserProfile";
import { UserRole } from "../model/UserRole";

export const initializeModels = async (alter: boolean) => {
  const models: IHaveStaticAssociate[] = [
    Session,
    User,
    UserProfile,
    UserRole,
    UserGrading,
    UserBankAccount,
    UserInvite,
    EventDefinition,
    EventInstance,
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
