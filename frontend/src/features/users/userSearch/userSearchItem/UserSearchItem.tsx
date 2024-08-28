import { Button } from "../../../../components/button/Button";
import { Card } from "../../../../components/card/Card";
import { texts } from "../../../../lib/useTranslation/texts";
import { useTranslation } from "../../../../lib/useTranslation/useTranslation";
import { IUserSearchItemProps } from "./IUserSearchItemProps";
import styles from "./UserSearchItem.module.scss";

export const UserSearchItem: React.FC<IUserSearchItemProps> = (props) => {
  const { t } = useTranslation();

  const onSelectUser = () => props.onSelect?.(props.userProfile);

  return (
    <Card className={styles.userSearchItem}>
      <div>{`${props.userProfile.firstname} ${props.userProfile.lastname}`}</div>
      <Button onClick={onSelectUser}>{t(texts.userSearchItem.addUser)}</Button>
    </Card>
  );
};
