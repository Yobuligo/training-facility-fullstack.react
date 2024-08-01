import { ArrowBackIcon } from "../../../icons/ArrowBackIcon";
import { UserProfile } from "../userProfile/UserProfile";
import { IUserProfileDetails } from "./IUserProfileDetails";
import styles from "./UserProfileDetails.module.scss";

export const UserProfileDetails: React.FC<IUserProfileDetails> = (props) => {
  return (
    <div className={styles.userProfileDetails}>
      <ArrowBackIcon onClick={props.onBack} />
      <UserProfile
        isAdminMode={props.isAdminMode}
        onCancel={props.onCancel}
        onChange={props.onChange}
        userProfile={props.userProfile}
      />
    </div>
  );
};
