import { Button } from "../../../components/button/Button";
import { texts } from "../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { TrainingCalendar } from "../trainingCalendar/TrainingCalendar";
import { useTrainingPlanSectionViewModel } from "./useTrainingPlanSectionViewModel";
import styles from './TrainingPlanSection.module.scss'

export const TrainingPlanSection: React.FC = () => {
  const { t } = useTranslation();
  const viewModel = useTrainingPlanSectionViewModel();

  return (
    <div className={styles.trainingPlanSection}>
      <Button className={styles.button} onClick={viewModel.onAppend}>
        {t(texts.trainingPlanSection.addTraining)}
      </Button>

      <TrainingCalendar />
    </div>
  );
};
