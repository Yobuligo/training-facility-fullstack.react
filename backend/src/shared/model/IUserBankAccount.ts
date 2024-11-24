import { IEntity } from "../../core/api/types/IEntity";

/**
 * This interface represents an entity containing all bank account information of a user.
 */
export interface IUserBankAccount extends IEntity {
  userProfileId: string;
  bankAccountOwner: string;
  bankAccountIBAN: string;
  bankAccountBIC: string;
  bankAccountInstitution: string;
}
