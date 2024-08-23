import { Card } from "../../../../components/card/Card";
import { IUserSelectItemProps } from "./IUserSelectItemProps";
import styles from "./UserSelectItem.module.scss";

export const UserSelectItem: React.FC<IUserSelectItemProps> = (props) => {
  return (
    <Card className={styles.userSelectItem}>
      <div>{`${props.userProfile.firstname} ${props.userProfile.lastname}`}</div>
    </Card>
  );
};
