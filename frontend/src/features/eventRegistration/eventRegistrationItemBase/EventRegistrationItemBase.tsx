import { UserProfileImageAndName } from "../../users/userProfileImage/userProfileImageAndName/UserProfileImageAndName";
import styles from "./EventRegistrationItemBase.module.scss";
import { IEventRegistrationItemBaseProps } from "./IEventRegistrationItemBaseProps";

/**
 * This component is responsible for displaying an event registration item, which represents a registered user for a training.
 * An registration item contains of an profile image, if available, the fullname of the registered user and can have buttons and an additional text.
 */
export const EventRegistrationItemBase: React.FC<
  IEventRegistrationItemBaseProps
> = (props) => {
  return (
    <div className={styles.manuallyAddedSection}>
      {props.text && (
        <div className={styles.addedByTrainerInfo}>{props.text}</div>
      )}

      <div className={styles.nameAndToolbarContainer}>
        <UserProfileImageAndName userProfile={props.userProfile} />
        {props.children}
      </div>
    </div>
  );
};
