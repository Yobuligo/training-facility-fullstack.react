import { IUser } from "../../../shared/model/IUser";
import { UserProfileImageSize } from "../../../shared/types/UserProfileImageSize";

export interface IProfileImageContainerProps {
  displayEditButton?: boolean;
  user: IUser;

  /**
   * Provide the user profile image size which should be displayed. Default is the original size.
   */
  size?: UserProfileImageSize;
}
