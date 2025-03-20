import { Button } from "../../../../components/button/Button";
import { Card } from "../../../../components/card/Card";
import { AddIcon } from "../../../../icons/AddIcon";
import { UserProfileImageAndName } from "../../../profileImage/profileImageAndName/UserProfileImageAndName";
import { IUserSearchItemProps } from "./IUserSearchItemProps";
import styles from "./UserSearchItem.module.scss";

export const UserSearchItem: React.FC<IUserSearchItemProps> = (props) => {
  const onSelectUser = () => props.onSelect?.(props.user);

  return (
    <Card className={styles.userSearchItem}>
      <UserProfileImageAndName user={props.user} />
      <Button onClick={onSelectUser}>
        <AddIcon className={styles.icon} />
      </Button>
    </Card>
  );
};
