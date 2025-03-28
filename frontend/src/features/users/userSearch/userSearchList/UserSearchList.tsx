import { CardList } from "../../../../components/cardList/CardList";
import { UserSearchItem } from "../userSearchItem/UserSearchItem";
import { IUserSearchListProps } from "./IUserSearchListProps";

export const UserSearchList: React.FC<IUserSearchListProps> = (props) => {
  const items = props.users.map((user) => (
    <UserSearchItem key={user.id} onSelect={props.onSelect} user={user} />
  ));

  return <CardList>{items}</CardList>;
};
