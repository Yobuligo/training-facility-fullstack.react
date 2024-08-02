import { Button } from "../../../components/button/Button";
import { texts } from "../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { GradingList } from "../gradingList/GradingList";
import styles from "./GradingSection.module.scss";
import { IGradingSectionProps } from "./IGradingSectionProps";
import { useGradingSectionViewModel } from "./useGradingSectionViewModel";

export const GradingSection: React.FC<IGradingSectionProps> = (props) => {
  const viewModel = useGradingSectionViewModel(props);
  const { t } = useTranslation();

  return (
    <div className={styles.gradingSection}>
      {props.isAdminMode && (
        <Button onClick={viewModel.onAddGrading} disabled={props.displayMode}>
          {t(texts.gradingSection.addGrading)}
        </Button>
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
