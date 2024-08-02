import { texts } from "../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { GradingAddForm } from "../gradingAddForm/GradingAddForm";
import { GradingList } from "../gradingList/GradingList";
import styles from "./GradingSection.module.scss";
import { IGradingSectionProps } from "./IGradingSectionProps";

export const GradingSection: React.FC<IGradingSectionProps> = (props) => {
  const { t } = useTranslation();

  return (
    <div className={styles.gradingSection}>
      {props.isAdminMode && (
        <div className={styles.card}>
          <h4 className={styles.addGradingTitle}>{t(texts.gradingSection.title)}</h4>
          <GradingAddForm
            displayMode={props.displayMode}
            onAddGrading={props.onAddGrading}
          />
        </div>
      )}

      <GradingList
        displayMode={props.displayMode}
        gradings={props.gradings}
        isAdminMode={props.isAdminMode}
        onDelete={props.onDelete}
      />
    </div>
  );
};
