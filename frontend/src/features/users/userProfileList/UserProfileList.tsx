import { UserProfileItem } from "../userProfileItem/UserProfileItem";
import { IUserProfileListProps } from "./IUserProfileListProps";
import styles from "./UserProfileList.module.scss";

export const UserProfileList: React.FC<IUserProfileListProps> = (props) => {
  const items = props.userProfilesShort.map((userProfileShort) => (
    <UserProfileItem
      key={userProfileShort.id}
      userProfileShort={userProfileShort}
      onSelect={() => props.onSelect?.(userProfileShort)}
    />
  ));

  return <div className={styles.userProfileList}>{items}</div>;
};
