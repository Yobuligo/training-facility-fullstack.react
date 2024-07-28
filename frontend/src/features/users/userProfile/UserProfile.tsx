import { IUserProfileProps } from "./IUserProfileProps";
import styles from "./UserProfile.module.scss";

export const UserProfile: React.FC<IUserProfileProps> = (props) => {
  return <div className={styles.userProfile}>User Profile</div>;
};
