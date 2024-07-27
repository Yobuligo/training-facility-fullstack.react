import { UserProfileItem } from "../userProfileItem/UserProfileItem";
import { IUserProfileListProps } from "./IUserProfileListProps";
import styles from "./UserProfileList.module.scss";

export const UserProfileList: React.FC<IUserProfileListProps> = (props) => {
  const items = props.userProfiles.map((userProfile) => (
    <UserProfileItem key={userProfile.id} userProfile={userProfile} />
  ));

  return <div className={styles.userProfileList}>{items}</div>;
};
