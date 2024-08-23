import { Button } from "../../../../components/button/Button";
import { Card } from "../../../../components/card/Card";
import { texts } from "../../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../../hooks/useTranslation/useTranslation";
import { IUserSelectItemProps } from "./IUserSelectItemProps";
import styles from "./UserSelectItem.module.scss";

export const UserSelectItem: React.FC<IUserSelectItemProps> = (props) => {
  const { t } = useTranslation();

  return (
    <Card className={styles.userSelectItem}>
      <div>{`${props.userProfile.firstname} ${props.userProfile.lastname}`}</div>
      <Button>{t(texts.userSelectItem.addUser)}</Button>
    </Card>
  );
};
