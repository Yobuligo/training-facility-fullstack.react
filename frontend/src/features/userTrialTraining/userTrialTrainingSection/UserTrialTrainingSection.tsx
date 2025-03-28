import { CardList } from "../../../components/cardList/CardList";
import { DateTimeSpanFilter } from "../../../components/dateTimeSpanFilter/DateTimeSpanFilter";
import { useUserTrialTrainingSectionViewModel } from "./useUserTrialTrainingSectionViewModel";

const UserTrialTrainingSection: React.FC = () => {
  const viewModel = useUserTrialTrainingSectionViewModel();

  return (
    <>
      <DateTimeSpanFilter
        fromDate={viewModel.dateTimeSpanFilter.from}
        isLoading={viewModel.isLoadUserTrialTrainingsProcessing}
        onChange={viewModel.onDateTimeSpanChanged}
        toDate={viewModel.dateTimeSpanFilter.to}
      />
      <CardList>
      Hello World
      </CardList>
    </>
  );
};

export default UserTrialTrainingSection;
