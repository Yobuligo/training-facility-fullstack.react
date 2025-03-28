import { CardList } from "../../../components/cardList/CardList";
import { DateTimeSpanFilter } from "../../../components/dateTimeSpanFilter/DateTimeSpanFilter";
import { UserTrialTrainingRecordsItem } from "../userTrialTrainingRecordsItem/UserTrialTrainingRecordsItem";
import { useUserTrialTrainingSectionViewModel } from "./useUserTrialTrainingSectionViewModel";

const UserTrialTrainingSection: React.FC = () => {
  const viewModel = useUserTrialTrainingSectionViewModel();

  const items = viewModel.userTrialTrainingRecords.map(
    (userTrialTrainingRecords, index) => (
      <UserTrialTrainingRecordsItem
        key={index}
        userTrialTrainingRecords={userTrialTrainingRecords}
      />
    )
  );

  return (
    <>
      <DateTimeSpanFilter
        fromDate={viewModel.dateTimeSpanFilter.from}
        isLoading={viewModel.isLoadUserTrialTrainingsProcessing}
        onChange={viewModel.onDateTimeSpanChanged}
        toDate={viewModel.dateTimeSpanFilter.to}
      />
      <CardList>{items}</CardList>
    </>
  );
};

export default UserTrialTrainingSection;
