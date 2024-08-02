import { Button } from "../../../components/button/Button";
import { Spinner } from "../../../components/spinner/Spinner";
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
      <Button onClick={viewModel.onAddGrading}>
        {t(texts.gradingSection.addGrading)}
      </Button>

      {viewModel.isLoading ? (
        <Spinner />
      ) : (
        <GradingList gradings={viewModel.gradings} />
      )}
    </div>
  );
};
