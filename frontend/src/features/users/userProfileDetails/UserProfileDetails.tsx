import { useSignal } from "../../../hooks/useSignal";
import { ArrowBackIcon } from "../../../icons/ArrowBackIcon";
import { UserProfile } from "../userProfile/UserProfile";
import { IUserProfileDetails } from "./IUserProfileDetails";
import styles from "./UserProfileDetails.module.scss";

export const UserProfileDetails: React.FC<IUserProfileDetails> = (props) => {
  const [cancelSignal, triggerCancelSignal] = useSignal();

  const onBack = () => triggerCancelSignal();

  return (
    <div className={styles.userProfileDetails}>
      <ArrowBackIcon onClick={onBack} />
      <UserProfile
        cancelSignal={cancelSignal}
        isAdminMode={props.isAdminMode}
        onCancel={props.onCancel}
        onChange={props.onChange}
        userProfile={props.userProfile}
      />
    </div>
  );
};
