import styles from "./CardList.module.scss";
import { ICardListProps } from "./ICardListProps";

export const CardList: React.FC<ICardListProps> = (props) => {
  return <div className={styles.cardList}>{props.children}</div>;
};
