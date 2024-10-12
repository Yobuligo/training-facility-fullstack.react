import { LabeledInput } from "../../../components/labeledInput/LabeledInput";
import { LabeledSelect } from "../../../components/labeledSelect/LabeledSelect";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import styles from "./GradingInputs.module.scss";
import { IGradingInputsProps } from "./IGradingInputsProps";
import { useGradingInputViewModel } from "./useGradingInputViewModel";

export const GradingInputs: React.FC<IGradingInputsProps> = (props) => {
  const { t } = useTranslation();
  const viewModel = useGradingInputViewModel(props);

  return (
    <div className={styles.gradingInputs}>
      <LabeledInput
        disabled={props.displayMode}
        label={t(texts.gradingItem.achievedAt)}
        type="date"
        onChange={viewModel.onChangeAchievedAt}
      />

      <LabeledSelect
        disabled={props.displayMode}
        label={t(texts.general.grade)}
        options={viewModel.gradeOptions}
        value={viewModel.grade}
        onSelect={(grade) => viewModel.setGrade(grade)}
      />

      <LabeledInput
        disabled={props.displayMode}
        label={t(texts.general.place)}
        onChange={viewModel.setPlace}
        value={viewModel.place}
      />

      <LabeledInput
        disabled={props.displayMode}
        label={t(texts.gradingItem.examiners)}
        onChange={viewModel.setExaminers}
        value={viewModel.examiners}
      />
    </div>
  );
};
