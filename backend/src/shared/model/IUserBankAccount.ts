import { IEntity } from "../../core/api/types/IEntity";
import { IHaveUserId } from "../../core/api/types/IHaveUserId";

export interface IUserBankAccount extends IEntity {
  userProfileId: string;
  bankAccountOwner: string;
  bankAccountIBAN: string;
  bankAccountBIC: string;
  bankAccountInstitution: string;
}
