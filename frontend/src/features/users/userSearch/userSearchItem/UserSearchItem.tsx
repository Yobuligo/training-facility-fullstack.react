import { Button } from "../../../../components/button/Button";
import { Card } from "../../../../components/card/Card";
import { texts } from "../../../../lib/translation/texts";
import { useTranslation } from "../../../../lib/translation/useTranslation";
import { UserInfo } from "../../../../services/UserInfo";
import { IUserSearchItemProps } from "./IUserSearchItemProps";
import styles from "./UserSearchItem.module.scss";

export const UserSearchItem: React.FC<IUserSearchItemProps> = (props) => {
  const { t } = useTranslation();

  const onSelectUser = () => props.onSelect?.(props.user);

  return (
    <Card className={styles.userSearchItem}>
      <div>{UserInfo.toFullName(props.user.userProfile)}</div>
      <Button onClick={onSelectUser}>{t(texts.userSearchItem.addUser)}</Button>
    </Card>
  );
};
