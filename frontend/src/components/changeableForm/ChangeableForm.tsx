import { texts } from "../../hooks/useTranslation/texts";
import { useTranslation } from "../../hooks/useTranslation/useTranslation";
import { Button } from "../button/Button";
import { Toolbar } from "../toolbar/Toolbar";
import styles from "./ChangeableForm.module.scss";
import { IChangeableFormProps } from "./IChangeableFormProps";
import { useChangeableFormViewModel } from "./useChangeableFormViewModel";

export const ChangeableForm: React.FC<IChangeableFormProps> = (props) => {
  const viewModel = useChangeableFormViewModel(props);
  const { t } = useTranslation();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) =>
    event.preventDefault();

  return (
    <form className={styles.changeableForm} onSubmit={onSubmit}>
      <Toolbar className={styles.toolbar}>
        {viewModel.displayMode ? (
          <Button onClick={viewModel.onToggleMode}>
            {t(texts.general.edit)}
          </Button>
        ) : (
          <>
            <Button
              className={styles.cancelButton}
              onClick={viewModel.onCancel}
            >
              {t(texts.general.cancel)}
            </Button>
            <Button onClick={viewModel.onSave}>{t(texts.general.save)}</Button>
          </>
        )}
      </Toolbar>
      {props.children}
    </form>
  );
};
