import { UserInfo } from "../../../services/UserInfo";
import { UserProfileImageSize } from "../../../shared/types/UserProfileImageSize";
import { ProfileImageContainer } from "../profileImageContainer/ProfileImageContainer";
import { ProfileImageSkeleton } from "../profileImageSkeleton/ProfileImageSkeleton";
import { IUserProfileImageAndNameProps } from "./IUserProfileImageAndNameProps";
import styles from "./UserProfileImageAndName.module.scss";

/**
 * This component is responsible for rendering an users image and its full name.
 */
export const UserProfileImageAndName: React.FC<
  IUserProfileImageAndNameProps
> = (props) => {
  return (
    <div className={styles.userProfileImageAndName}>
      {props.user ? (
        <ProfileImageContainer
          size={UserProfileImageSize.THUMBNAIL}
          user={props.user}
        />
      ) : (
        <ProfileImageSkeleton size={UserProfileImageSize.THUMBNAIL} />
      )}
      {UserInfo.toFullName(props.user?.userProfile)}
    </div>
  );
};
