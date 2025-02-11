import { Collapse } from "../../../components/collapse/Collapse";
import { SpinnerButton } from "../../../components/spinnerButton/SpinnerButton";
import { useRenderGrade } from "../../hooks/useRenderGrade";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { GradingInputs } from "../gradingInputs/GradingInputs";
import styles from "./GradingItemEdit.module.scss";
import { IGradingItemEditProps } from "./IGradingItemEditProps";
import { useGradingItemEditViewModel } from "./useGradingItemEditViewModel";

export const GradingItemEdit: React.FC<IGradingItemEditProps> = (props) => {
  const viewModel = useGradingItemEditViewModel(props);
  const { t } = useTranslation();
  const renderGrade = useRenderGrade();

  return (
    <div>
      <Collapse
        collapsed={viewModel.collapse}
        setCollapsed={viewModel.setCollapse}
        title={renderGrade(props.grading.grade)}
      />
      {!viewModel.collapse && (
        <div className={styles.gradingItemEdit}>
          <GradingInputs
            achievedAt={props.grading.achievedAt}
            displayMode={props.displayMode}
            examiners={props.grading.examiners}
            grade={props.grading.grade}
            kickTechnique={props.grading.kickTechnique}
            place={props.grading.place}
            onAchievedAtChange={viewModel.onAchievedAtChange}
            onExaminersChange={viewModel.onExaminersChange}
            onGradeChange={viewModel.onGradeChange}
            onKickTechniqueChange={viewModel.onKickTechniqueChange}
            onPlaceChange={viewModel.onPlaceChange}
          />
          <div className={styles.deleteButton}>
            <SpinnerButton
              disabled={props.displayMode}
              displaySpinner={false}
              onClick={viewModel.onDelete}
            >
              {t(texts.general.delete)}
            </SpinnerButton>
          </div>
        </div>
      )}
    </div>
  );
};
