import { UserProfileItem } from "../userProfileItem/UserProfileItem";
import { IUserProfileListProps } from "./IUserProfileListProps";
import styles from "./UserProfileList.module.scss";

export const UserProfileList: React.FC<IUserProfileListProps> = (props) => {
  const items = props.usersShort.map((userShort) => (
    <UserProfileItem
      key={userShort.id}
      userShort={userShort}
      onSelect={() => props.onSelect?.(userShort)}
    />
  ));

  return <div className={styles.userProfileList}>{items}</div>;
};
