import { DateTimeSpanFilter } from "../../../components/dateTimeSpanFilter/DateTimeSpanFilter";
import { useTrialTrainingSectionViewModel } from "./useTrialTrainingSectionViewModel";

const TrialTrainingSection: React.FC = () => {
  const viewModel = useTrialTrainingSectionViewModel();

  return (
    <>
      <DateTimeSpanFilter
        fromDate={viewModel.dateTimeSpanFilter.from}
        isLoading={viewModel.isLoadUserTrialTrainingsProcessing}
        onChange={viewModel.onDateTimeSpanChanged}
        toDate={viewModel.dateTimeSpanFilter.to}
      />
    </>
  );
};

export default TrialTrainingSection;
