import { Button } from "../../../components/button/Button";
import { texts } from "../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { useTrainingPlanSectionViewModel } from "./useTrainingPlanSectionViewModel";

export const TrainingPlanSection: React.FC = () => {
  const { t } = useTranslation();
  const viewModel = useTrainingPlanSectionViewModel();

  return (
    <div>
      <Button onClick={viewModel.onAppend}>
        {t(texts.trainingPlanSection.addTraining)}
      </Button>
    </div>
  );
};
