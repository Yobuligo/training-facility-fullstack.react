import { IEntity } from "../../core/api/types/IEntity";

/**
 * This interface represents an entity containing all information of a guardian for a user.
 */
export interface IUserGuardian extends IEntity {
  userProfileId: string;
  guardianFirstname: string;
  guardianLastname: string;
  guardianPhone: string;
  guardianEmail: string;
}
