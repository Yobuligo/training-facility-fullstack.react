import { useState } from "react";
import { UserTrialTrainingApi } from "../../../api/UserTrialTrainingApi";
import { DateTime } from "../../../core/services/date/DateTime";
import { IDateTimeSpan } from "../../../core/services/date/IDateTimeSpan";
import { useDateTimeSpanFilter } from "../../../hooks/useDateTimeSpanFilter";
import { useInitialize } from "../../../hooks/useInitialize";
import { useRequest } from "../../../lib/userSession/hooks/useRequest";
import { IUserTrialTrainingRecords } from "../../../shared/model/IUserTrialTrainingRecords";

export const useUserTrialTrainingSectionViewModel = () => {
  const [dateTimeSpanFilter, setDateTimeSpanFilter] = useDateTimeSpanFilter();
  const [loadUserTrialTrainings, isLoadUserTrialTrainingsProcessing] =
    useRequest();
  const [userTrialTrainingRecords, setUserTrialTrainingRecords] = useState<
    IUserTrialTrainingRecords[]
  >([]);

  const onLoadUserTrialTrainings = (dateTimeSpan: IDateTimeSpan) =>
    loadUserTrialTrainings(async () => {
      const from = DateTime.getDayStartDate(dateTimeSpan.from);
      const to = DateTime.getDayEndDate(dateTimeSpan.to);
      const userTrialTrainingsApi = new UserTrialTrainingApi();
      const userTrialTrainingRecords =
        await userTrialTrainingsApi.findAllUserTrialTrainingRecords({
          from,
          to,
        });
      setUserTrialTrainingRecords(userTrialTrainingRecords);
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
    userTrialTrainingRecords,
  };
};
