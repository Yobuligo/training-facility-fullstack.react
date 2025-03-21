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
      {props.userProfile ? (
        <UserProfileImage
          size={UserProfileImageSize.THUMBNAIL}
          userProfile={props.userProfile}
        />
      ) : (
        <UserProfileImageSkeleton size={UserProfileImageSize.THUMBNAIL} />
      )}
      {UserInfo.toFullName(props.userProfile)}
    </div>
  );
};
