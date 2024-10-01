import { style } from "../../core/ui/style";
import { texts } from "../../lib/translation/texts";
import { useTranslation } from "../../lib/translation/useTranslation";
import { ILabeledElementProps } from "./ILabeledElementProps";
import styles from "./LabeledElement.module.scss";

export const LabeledElement: React.FC<ILabeledElementProps> = (props) => {
  const { t } = useTranslation();
  return (
    <div className={style(styles.labeledElement, props.className)}>
      <div className={styles.labelContainer}>
        <label className={styles.label} htmlFor={props.elementId}>
          {props.label}
        </label>
        {props.isOptional === true && (
          <div className={styles.optional}>{t(texts.general.isOptional)}</div>
        )}
      </div>
      {props.children}
      <div className={styles.error}>{props.error}</div>
    </div>
  );
};
