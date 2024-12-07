import { IEntity } from "../../core/api/types/IEntity";
import { IHaveUserProfileId } from "../types/IHaveUserProfileId";

/**
 * This interface represents an entity containing all information of a guardian for a user.
 */
export interface IUserGuardian extends IEntity, IHaveUserProfileId {
  email: string;
  firstname: string;
  lastname: string;
  phone: string;
}
