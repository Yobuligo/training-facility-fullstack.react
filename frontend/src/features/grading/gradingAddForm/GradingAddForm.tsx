import { Button } from "../../../components/button/Button";
import { LabeledInput } from "../../../components/labeledInput/LabeledInput";
import { LabeledSelect } from "../../../components/labeledSelect/LabeledSelect";
import { Toolbar } from "../../../components/toolbar/Toolbar";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
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
        />

        <LabeledSelect
          disabled={props.displayMode}
          label={t(texts.general.grade)}
          options={viewModel.gradeOptions}
          value={viewModel.grade}
          onSelect={(grade) => viewModel.setGrade(grade)}
        />

        <LabeledSelect
          disabled={props.displayMode}
          label={t(texts.gradingItem.kickTechnique)}
          options={viewModel.kickTechniqueOptions}
          value={viewModel.kickTechnique}
          onSelect={(kickTechnique) =>
            viewModel.setKickTechnique(kickTechnique)
          }
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
      <Toolbar className={styles.toolbar}>
        <Button disabled={props.displayMode} onClick={viewModel.onConfirm}>
          {t(texts.gradingAddForm.addGrading)}
        </Button>
      </Toolbar>
    </form>
  );
};
