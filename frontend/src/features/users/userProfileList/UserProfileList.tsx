import { CardList } from "../../../components/cardList/CardList";
import { UserInfo } from "../../../services/UserInfo";
import { UserProfileItem } from "../userProfileItem/UserProfileItem";
import { IUserProfileListProps } from "./IUserProfileListProps";

export const UserProfileList: React.FC<IUserProfileListProps> = (props) => {
  const items = props.usersShort.map((userShort) => (
    <UserProfileItem
      key={userShort.id}
      isAdmin={UserInfo.containsAdminRoleFromShort(userShort.userRoles)}
      isTrainer={UserInfo.containsTrainerRoleFromShort(userShort.userRoles)}
      onSelect={() => props.onSelect?.(userShort)}
      userShort={userShort}
    />
  ));

  return <CardList displayNumberEntries>{items}</CardList>;
};
