import { IEntity } from "../../core/api/types/IEntity";
import { IHaveUserProfileId } from "../types/IHaveUserProfileId";

/**
 * This interface represents an entity containing all bank account information of a user.
 */
export interface IUserBankAccount extends IEntity, IHaveUserProfileId {
  bankAccountOwner: string;
  bankAccountIBAN: string;
  bankAccountBIC: string;
  mandateDate: Date;
  mandateReference: string;
}
