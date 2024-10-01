import { texts } from "../../lib/translation/texts";
import { useTranslation } from "../../lib/translation/useTranslation";
import { Button } from "../button/Button";
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
            onClick={viewModel.onClickDay}
            className={styles.button}
          >
            {t(texts.general.dateTimeSpan.today)}
          </SecondaryButton>
          <SecondaryButton
            onClick={viewModel.onClickTomorrow}
            className={styles.button}
          >
            {t(texts.general.dateTimeSpan.tomorrow)}
          </SecondaryButton>

          <SecondaryButton
            onClick={viewModel.onClickWeek}
            className={styles.button}
          >
            {t(texts.general.dateTimeSpan.week)}
          </SecondaryButton>
          <SecondaryButton
            onClick={viewModel.onClickMonth}
            className={styles.button}
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
          <Button className={styles.applyButton} onClick={props.onApply}>
            {t(texts.general.apply)}
          </Button>
        </div>
      </div>
    </div>
  );
};
