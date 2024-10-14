import { useState } from "react";
import { Collapse } from "../../../components/collapse/Collapse";
import { SpinnerButton } from "../../../components/spinnerButton/SpinnerButton";
import { useRenderGrade } from "../../../hooks/useRenderGrade";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { GradingInputs } from "../gradingInputs/GradingInputs";
import styles from "./GradingItemEdit.module.scss";
import { IGradingItemEditProps } from "./IGradingItemEditProps";

export const GradingItemEdit: React.FC<IGradingItemEditProps> = (props) => {
  const { t } = useTranslation();
  const [collapse, setCollapse] = useState(true);
  const renderGrade = useRenderGrade();

  const onDelete = () => props.onDelete?.(props.grading);

  return (
    <>
      <Collapse
        collapsed={collapse}
        setCollapsed={setCollapse}
        title={renderGrade(props.grading.grade)}
      />
      {!collapse && (
        <div className={styles.gradingItemEdit}>
          <GradingInputs
            achievedAt={props.grading.achievedAt}
            displayMode={props.displayMode}
            examiners={props.grading.examiners}
            grade={props.grading.grade}
            place={props.grading.place}
          />
          <div className={styles.deleteButton}>
            <SpinnerButton
              disabled={props.displayMode}
              displaySpinner={false}
              onClick={onDelete}
            >
              {t(texts.general.delete)}
            </SpinnerButton>
          </div>
        </div>
      )}
    </>
  );
};
