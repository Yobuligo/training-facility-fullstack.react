import { Button } from "../../../../components/button/Button";
import { Card } from "../../../../components/card/Card";
import { AddIcon } from "../../../../icons/AddIcon";
import { UserProfileImageAndName } from "../../userProfileImage/userProfileImageAndName/UserProfileImageAndName";
import { IUserSearchItemProps } from "./IUserSearchItemProps";
import styles from "./UserSearchItem.module.scss";

/**
 * Displays a specific user search result item with user profile image, full name and button for adding the user.
 */
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
