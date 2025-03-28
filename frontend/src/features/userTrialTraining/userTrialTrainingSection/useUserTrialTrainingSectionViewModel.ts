import { UserTrialTrainingApi } from "../../../api/UserTrialTrainingApi";
import { DateTime } from "../../../core/services/date/DateTime";
import { IDateTimeSpan } from "../../../core/services/date/IDateTimeSpan";
import { useDateTimeSpanFilter } from "../../../hooks/useDateTimeSpanFilter";
import { useInitialize } from "../../../hooks/useInitialize";
import { useRequest } from "../../../lib/userSession/hooks/useRequest";

export const useUserTrialTrainingSectionViewModel = () => {
  const [dateTimeSpanFilter, setDateTimeSpanFilter] = useDateTimeSpanFilter();
  const [loadUserTrialTrainings, isLoadUserTrialTrainingsProcessing] =
    useRequest();

  const onLoadUserTrialTrainings = (dateTimeSpan: IDateTimeSpan) =>
    loadUserTrialTrainings(async () => {
      const from = DateTime.getDayStartDate(dateTimeSpan.from);
      const to = DateTime.getDayEndDate(dateTimeSpan.to);
      const userTrialTrainingsApi = new UserTrialTrainingApi();
      const userTrialTrainings =
        await userTrialTrainingsApi.findAllUserTrialTrainingRecords({
          from,
          to,
        });
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
