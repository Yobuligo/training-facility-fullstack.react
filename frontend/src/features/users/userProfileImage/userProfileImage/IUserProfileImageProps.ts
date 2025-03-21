import { IUser } from "../../../../shared/model/IUser";
import { UserProfileImageSize } from "../../../../shared/types/UserProfileImageSize";

export interface IUserProfileImageProps {
  /**
   * Provides if a button to change the user profile image should be displayed.
   */
  displayEditButton?: boolean;

  /**
   * Provides the user for which the user profile image should be displayed
   */
  user: IUser;

  /**
   * Provides the user profile image size which should be displayed. Default is the original size.
   */
  size?: UserProfileImageSize;
}
