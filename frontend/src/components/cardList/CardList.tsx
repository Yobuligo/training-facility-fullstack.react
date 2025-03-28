import { texts } from "../../lib/translation/texts";
import { useTranslation } from "../../lib/translation/useTranslation";
import { NumberDisplay } from "../numberDisplay/NumberDisplay";
import styles from "./CardList.module.scss";
import { ICardListProps } from "./ICardListProps";

export const CardList: React.FC<ICardListProps> = (props) => {
  const { t } = useTranslation();

  const isEmpty = () => {
    if (Array.isArray(props.children) && props.children.length === 0) {
      return true;
    } else {
      return false;
    }
  };

  const numberEntries = Array.isArray(props.children)
    ? props.children.length
    : 0;

  return (
    <div className={styles.cardList}>
      {props.displayNumberEntries === true && (
        <h4 className={styles.numberEntries}>
          {t(texts.userProfileList.numberEntries)}
          <NumberDisplay value={numberEntries} />
        </h4>
      )}
      {isEmpty() ? (
        <>
          {props.noEntriesFoundText
            ? props.noEntriesFoundText
            : t(texts.general.noEntriesFound)}
        </>
      ) : (
        props.children
      )}
    </div>
  );
};
