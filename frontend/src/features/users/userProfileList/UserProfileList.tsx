import { UserProfileItem } from "../userProfileItem/UserProfileItem";
import { IUserProfileListProps } from "./IUserProfileListProps";
import styles from "./UserProfileList.module.scss";

export const UserProfileList: React.FC<IUserProfileListProps> = (props) => {
  const items = props.userProfiles.map((userProfile) => (
    <UserProfileItem
      key={userProfile.id}
      isSelected={userProfile === props.selected}
      userProfile={userProfile}
      onCancel={() => props.onCancel?.(userProfile)}
      onChange={() => props.onChange?.(userProfile)}
      onSelect={() => props.onSelect?.(userProfile)}
    />
  ));

  return <div className={styles.userProfileList}>{items}</div>;
};
