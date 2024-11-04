import { style } from "../../core/ui/style";
import { InfoIcon } from "../../icons/InfoIcon";
import { texts } from "../../lib/translation/texts";
import { useTranslation } from "../../lib/translation/useTranslation";
import componentStyles from "../../styles/components.module.scss";
import { Tooltip } from "../tooltip/Tooltip";
import { ILabeledElementProps } from "./ILabeledElementProps";
import styles from "./LabeledElement.module.scss";

export const LabeledElement: React.FC<ILabeledElementProps> = (props) => {
  const { t } = useTranslation();
  return (
    <div className={style(styles.labeledElement, props.className)}>
      <div className={styles.labelContainer}>
        <div className={styles.labelText}>
          <label className={styles.label} htmlFor={props.elementId}>
            {props.label}
          </label>
          {props.infoText && (
            <Tooltip text={props.infoText}>
              <InfoIcon className={componentStyles.infoIcon} />
            </Tooltip>
          )}
        </div>
        {props.isOptional === true && (
          <div className={styles.optional}>{t(texts.general.isOptional)}</div>
        )}
      </div>
      {props.children}
      <div className={styles.error}>{props.error}</div>
    </div>
  );
};
