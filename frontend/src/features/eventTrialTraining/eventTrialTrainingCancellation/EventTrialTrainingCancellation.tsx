import { PageSpinner } from "../../../components/pageSpinner/PageSpinner";
import { useEventTrialTrainingCancellation } from "./useEventTrialTrainingCancellation";

export const EventTrialTrainingCancellation: React.FC = () => {
  const viewModel = useEventTrialTrainingCancellation();
  return (
    <>
      {viewModel.isLoadUserTrialTrainingDetailsRequestProcessing ? (
        <PageSpinner />
      ) : (
        <>Hello World</>
      )}
    </>
  );
};
