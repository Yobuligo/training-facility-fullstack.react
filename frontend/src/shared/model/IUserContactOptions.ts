import { IEntity } from "../../core/api/types/IEntity";

/**
 * This interface represents an entity containing all possible contact options of a user.
 */
export interface IUserContactOptions extends IEntity {
  userProfileId: string;
  email: boolean;
  homepagePhotos: boolean;
  printPhotos: boolean;
  socialMediaPhotos: boolean;
  textMessage: boolean;
  whatsApp: boolean;
}
