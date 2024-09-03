import { UserInfo } from "../../../services/UserInfo";
import { UserProfileItem } from "../userProfileItem/UserProfileItem";
import { IUserProfileListProps } from "./IUserProfileListProps";
import styles from "./UserProfileList.module.scss";

export const UserProfileList: React.FC<IUserProfileListProps> = (props) => {
  const items = props.usersShort.map((userShort) => (
    <UserProfileItem
      key={userShort.id}
      isAdmin={UserInfo.containsAdminRoleFromShort(userShort.userRoles)}
      onSelect={() => props.onSelect?.(userShort)}
      userShort={userShort}
    />
  ));

  return <div className={styles.userProfileList}>{items}</div>;
};
