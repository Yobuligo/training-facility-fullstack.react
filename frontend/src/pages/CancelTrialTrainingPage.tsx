import { PublicPage } from "../components/pages/publicPage/PublicPage";
import { EventTrialTrainingCancellation } from "../features/eventTrialTraining/eventTrialTrainingCancellation/EventTrialTrainingCancellation";

export const CancelTrialTrainingPage: React.FC = () => {
  return (
    <PublicPage>
      <EventTrialTrainingCancellation />
    </PublicPage>
  );
};
