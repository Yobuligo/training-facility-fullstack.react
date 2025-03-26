import { UserProfileImageAndName } from "../../users/userProfileImage/userProfileImageAndName/UserProfileImageAndName";
import styles from "./EventRegistrationItem.module.scss";
import { IEventRegistrationItemProps } from "./IEventRegistrationItemProps";

/**
 * This component is responsible for displaying an event registration item, which represents a registered user for a training.
 * An registration item contains of a profile image, if available, the fullname of the registered user and can have buttons and an additional text.
 */
export const EventRegistrationItem: React.FC<IEventRegistrationItemProps> = (
  props
) => {
  return (
    <div className={styles.eventRegistrationItem}>
      {props.text && <div className={styles.text}>{props.text}</div>}

      <div className={styles.nameAndToolbarContainer}>
        <UserProfileImageAndName userProfile={props.userProfile} />
        {props.children}
      </div>
    </div>
  );
};
