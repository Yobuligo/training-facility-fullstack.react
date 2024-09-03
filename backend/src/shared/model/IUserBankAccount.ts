import { IEntity } from "../../core/api/types/IEntity";

export interface IUserBankAccount extends IEntity {
  userProfileId: string;
  bankAccountOwner: string;
  bankAccountIBAN: string;
  bankAccountBIC: string;
  bankAccountInstitution: string;
}
