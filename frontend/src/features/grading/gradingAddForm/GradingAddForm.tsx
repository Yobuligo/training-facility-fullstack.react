import { Button } from "../../../components/button/Button";
import { LabeledInput } from "../../../components/labeledInput/LabeledInput";
import { LabeledSelect } from "../../../components/labeledSelect/LabeledSelect";
import { Toolbar } from "../../../components/toolbar/Toolbar";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { toDate } from "../../../utils/toDate";
import styles from "./GradingAddForm.module.scss";
import { IGradingAddFormProps } from "./IGradingAddFormProps";
import { useGradingAddFormViewModel } from "./userGradingAddFormViewModel";

export const GradingAddForm: React.FC<IGradingAddFormProps> = (props) => {
  const viewModel = useGradingAddFormViewModel(props);
  const { t } = useTranslation();

  return (
    <form className={styles.form} onSubmit={viewModel.onSubmit}>
      <div className={styles.inputs}>
        <LabeledInput
          disabled={props.displayMode}
          label={t(texts.gradingItem.achievedAt)}
          type="date"
          onChange={viewModel.onChangeAchievedAt}
          value={toDate(viewModel.achievedAt)}
        />

        <LabeledSelect
          disabled={props.displayMode}
          label={t(texts.general.grade)}
          options={viewModel.gradeOptions}
          onSelect={viewModel.onGradeChange}
          selected={viewModel.selectedGradeOption}
        />

        <LabeledInput
          disabled={props.displayMode}
          label={t(texts.gradingItem.examiners)}
          onChange={viewModel.setExaminers}
          value={viewModel.examiners}
        />
      </div>
      <Toolbar className={styles.toolbar}>
        <Button disabled={props.displayMode} onClick={viewModel.onConfirm}>
          {t(texts.gradingAddForm.addGrading)}
        </Button>
      </Toolbar>
    </form>
  );
};
