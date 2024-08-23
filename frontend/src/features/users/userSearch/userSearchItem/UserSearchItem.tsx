import { Button } from "../../../../components/button/Button";
import { Card } from "../../../../components/card/Card";
import { texts } from "../../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../../hooks/useTranslation/useTranslation";
import { IUserSearchItemProps } from "./IUserSearchItemProps";
import styles from "./UserSearchItem.module.scss";

export const UserSearchItem: React.FC<IUserSearchItemProps> = (props) => {
  const { t } = useTranslation();

  return (
    <Card className={styles.userSearchItem}>
      <div>{`${props.userProfile.firstname} ${props.userProfile.lastname}`}</div>
      <Button>{t(texts.userSearchItem.addUser)}</Button>
    </Card>
  );
};
