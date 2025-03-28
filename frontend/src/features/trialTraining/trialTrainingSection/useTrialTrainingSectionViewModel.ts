import { UserTrialTrainingApi } from "../../../api/UserTrialTrainingApi";
import { IDateTimeSpan } from "../../../core/services/date/IDateTimeSpan";
import { useDateTimeSpanFilter } from "../../../hooks/useDateTimeSpanFilter";
import { useInitialize } from "../../../hooks/useInitialize";
import { useRequest } from "../../../lib/userSession/hooks/useRequest";

export const useTrialTrainingSectionViewModel = () => {
  const [dateTimeSpanFilter, setDateTimeSpanFilter] = useDateTimeSpanFilter();
  const [loadUserTrialTrainings, isLoadUserTrialTrainingsProcessing] =
    useRequest();

  const onLoadUserTrialTrainings = (dateTimeSpan: IDateTimeSpan) =>
    loadUserTrialTrainings(async () => {
      console.log(`from : ${dateTimeSpan.from.toLocaleString()}`);
      console.log(`to : ${dateTimeSpan.to.toLocaleString()}`);
      const userTrialTrainingsApi = new UserTrialTrainingApi();
      const userTrialTrainings = await userTrialTrainingsApi.findAll();
    });

  useInitialize(() =>
    onLoadUserTrialTrainings({
      from: dateTimeSpanFilter.from,
      to: dateTimeSpanFilter.to,
    })
  );

  const onDateTimeSpanChanged = (from: Date, to: Date) => {
    const dateTimeSpan: IDateTimeSpan = { from, to };
    setDateTimeSpanFilter(dateTimeSpan);
    onLoadUserTrialTrainings(dateTimeSpan);
  };

  return {
    dateTimeSpanFilter,
    isLoadUserTrialTrainingsProcessing,
    onDateTimeSpanChanged,
  };
};
