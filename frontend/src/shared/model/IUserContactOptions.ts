import { IEntity } from "../../core/api/types/IEntity";
import { IHaveUserProfileId } from "../types/IHaveUserProfileId";

/**
 * This interface represents an entity containing all possible contact options of a user.
 */
export interface IUserContactOptions extends IEntity, IHaveUserProfileId {
  email: boolean;
  homepagePhotos: boolean;
  printPhotos: boolean;
  socialMediaPhotos: boolean;
  textMessage: boolean;
  whatsApp: boolean;
}
