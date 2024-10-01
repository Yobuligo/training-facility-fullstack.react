import { texts } from "../../lib/translation/texts";
import { useTranslation } from "../../lib/translation/useTranslation";
import { Button } from "../button/Button";
import { LabeledInput } from "../labeledInput/LabeledInput";
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
    <div className={styles.dateTimeSpanFilter}>
      <Toolbar>
        <Button onClick={viewModel.onClickYesterday} className={styles.button}>
          {t(texts.general.dateTimeSpan.day)}
        </Button>
        <Button onClick={viewModel.onClickDay} className={styles.button}>
          {t(texts.general.dateTimeSpan.tomorrow)}
        </Button>
        <Button onClick={viewModel.onClickWeek} className={styles.button}>
          {t(texts.general.dateTimeSpan.week)}
        </Button>
        <Button onClick={viewModel.onClickMonth} className={styles.button}>
          {t(texts.general.dateTimeSpan.month)}
        </Button>
      </Toolbar>
      <div className={styles.inputGroup}>
        <LabeledInput
          label={t(texts.general.dateTimeSpan.from)}
          onChange={viewModel.onChangeFromDate}
          type="date"
          value={viewModel.fromDate}
        />
        <LabeledInput
          label={t(texts.general.dateTimeSpan.to)}
          onChange={viewModel.onChangeToDate}
          type="date"
          value={viewModel.toDate}
        />
        <Button onClick={props.onApply}>{t(texts.general.apply)}</Button>
      </div>
    </div>
  );
};
