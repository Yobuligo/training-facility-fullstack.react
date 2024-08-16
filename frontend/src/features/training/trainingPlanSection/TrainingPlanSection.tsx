import { useState } from "react";
import { AppointmentForm } from "../../../components/appointmentForm/AppointmentForm";
import { Button } from "../../../components/button/Button";
import { ChangeableForm } from "../../../components/changeableForm/ChangeableForm";
import { DetailView } from "../../../components/detailView/DetailView";
import { texts } from "../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { TrainingCalendar } from "../trainingCalendar/TrainingCalendar";
import styles from "./TrainingPlanSection.module.scss";
import { useTrainingPlanSectionViewModel } from "./useTrainingPlanSectionViewModel";

export const TrainingPlanSection: React.FC = () => {
  const [displayMode, setDisplayMode] = useState(true);
  const { t } = useTranslation();
  const viewModel = useTrainingPlanSectionViewModel();

  return (
    <div className={styles.trainingPlanSection}>
      {viewModel.displayDetails ? (
        <DetailView onBack={viewModel.onBack}>
          <ChangeableForm
            displayMode={displayMode}
            setDisplayMode={setDisplayMode}
          >
            <AppointmentForm disabled={displayMode} />
          </ChangeableForm>
        </DetailView>
      ) : (
        <>
          <Button className={styles.button} onClick={viewModel.onAdd}>
            {t(texts.trainingPlanSection.addTraining)}
          </Button>
          <TrainingCalendar />
        </>
      )}
    </div>
  );
};
