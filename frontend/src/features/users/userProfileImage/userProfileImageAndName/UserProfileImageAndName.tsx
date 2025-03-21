import { UserInfo } from "../../../../services/UserInfo";
import { UserProfileImageSize } from "../../../../shared/types/UserProfileImageSize";
import { UserProfileImage } from "../userProfileImage/UserProfileImage";
import { UserProfileImageSkeleton } from "../userProfileImageSkeleton/UserProfileImageSkeleton";
import { IUserProfileImageAndNameProps } from "./IUserProfileImageAndNameProps";
import styles from "./UserProfileImageAndName.module.scss";

/**
 * This component is responsible for rendering an users profile image and its full name.
 */
export const UserProfileImageAndName: React.FC<
  IUserProfileImageAndNameProps
> = (props) => {
  return (
    <div className={styles.userProfileImageAndName}>
      {props.user ? (
        <UserProfileImage
          size={UserProfileImageSize.THUMBNAIL}
          user={props.user}
        />
      ) : (
        <UserProfileImageSkeleton size={UserProfileImageSize.THUMBNAIL} />
      )}
      {UserInfo.toFullName(props.user?.userProfile)}
    </div>
  );
};
