import { texts } from "../../lib/translation/texts";
import { useTranslation } from "../../lib/translation/useTranslation";
import { LabeledInput } from "../labeledInput/LabeledInput";
import { SecondaryButton } from "../secondaryButton/SecondaryButton";
import { Toolbar } from "../toolbar/Toolbar";
import styles from "./DateTimeSpanFilter.module.scss";
import { IDateTimeSpanFilterProps } from "./IDateTimeSpanFilterProps";
import { useDateTimeSpanFilterViewModel } from "./useDateTimeSpanFilterViewModel";

export const DateTimeSpanFilter: React.FC<IDateTimeSpanFilterProps> = (
  props
) => {
  const { t } = useTranslation();
  const viewModel = useDateTimeSpanFilterViewModel(props);

  return (
    <div className={styles.container}>
      <div className={styles.dateTimeSpanFilter}>
        <Toolbar>
          <SecondaryButton
            className={styles.button}
            displaySpinner={viewModel.displayTodaySpinner}
            onClick={viewModel.onClickToday}
          >
            {t(texts.general.dateTimeSpan.today)}
          </SecondaryButton>

          <SecondaryButton
            className={styles.button}
            displaySpinner={viewModel.displayTomorrowSpinner}
            onClick={viewModel.onClickTomorrow}
          >
            {t(texts.general.dateTimeSpan.tomorrow)}
          </SecondaryButton>

          <SecondaryButton
            className={styles.button}
            displaySpinner={viewModel.displayWeekSpinner}
            onClick={viewModel.onClickWeek}
          >
            {t(texts.general.dateTimeSpan.week)}
          </SecondaryButton>
          <SecondaryButton
            className={styles.button}
            displaySpinner={viewModel.displayMonthSpinner}
            onClick={viewModel.onClickMonth}
          >
            {t(texts.general.dateTimeSpan.month)}
          </SecondaryButton>
        </Toolbar>
        <div className={styles.inputGroup}>
          <div className={styles.fromToInputs}>
            <LabeledInput
              className={styles.input}
              label={t(texts.general.dateTimeSpan.from)}
              onChange={viewModel.onChangeFromDate}
              type="date"
              value={viewModel.fromDate}
            />
            <LabeledInput
              className={styles.input}
              label={t(texts.general.dateTimeSpan.to)}
              onChange={viewModel.onChangeToDate}
              type="date"
              value={viewModel.toDate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
