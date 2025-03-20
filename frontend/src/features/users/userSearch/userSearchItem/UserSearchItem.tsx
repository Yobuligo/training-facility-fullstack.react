import { Button } from "../../../../components/button/Button";
import { Card } from "../../../../components/card/Card";
import { AddIcon } from "../../../../icons/AddIcon";
import { UserInfo } from "../../../../services/UserInfo";
import { UserProfileImageSize } from "../../../../shared/types/UserProfileImageSize";
import { ProfileImageContainer } from "../../../profileImage/profileImageContainer/ProfileImageContainer";
import { IUserSearchItemProps } from "./IUserSearchItemProps";
import styles from "./UserSearchItem.module.scss";

export const UserSearchItem: React.FC<IUserSearchItemProps> = (props) => {
  const onSelectUser = () => props.onSelect?.(props.user);

  return (
    <Card className={styles.userSearchItem}>
      <div className={styles.imageAndNameContainer}>
        <ProfileImageContainer
          displayEditButton={false}
          size={UserProfileImageSize.THUMBNAIL}
          user={props.user}
        />
        <div>{UserInfo.toFullName(props.user.userProfile)}</div>
      </div>
      <Button onClick={onSelectUser}>
        <AddIcon className={styles.icon} />
      </Button>
    </Card>
  );
};
