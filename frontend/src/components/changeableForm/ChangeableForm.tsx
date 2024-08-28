import { texts } from "../../lib/translation/texts";
import { useTranslation } from "../../lib/translation/useTranslation";
import { Button } from "../button/Button";
import { SecondaryButton } from "../secondaryButton/SecondaryButton";
import { Toolbar } from "../toolbar/Toolbar";
import styles from "./ChangeableForm.module.scss";
import { IChangeableFormProps } from "./IChangeableFormProps";
import { useChangeableFormViewModel } from "./useChangeableFormViewModel";

/**
 * This component is responsible for displaying a form with a toolbar to switch between change and display mode and buttons for saving or cancelling changes.
 */
export const ChangeableForm: React.FC<IChangeableFormProps> = (props) => {
  const viewModel = useChangeableFormViewModel(props);
  const { t } = useTranslation();

  return (
    <div className={styles.changeableForm}>
      <Toolbar className={styles.toolbar}>
        {props.displayMode ? (
          <Button onClick={viewModel.onToggleMode}>
            {t(texts.general.edit)}
          </Button>
        ) : (
          <>
            <SecondaryButton onClick={viewModel.onCancel}>
              {t(texts.general.cancel)}
            </SecondaryButton>
            {props.displayDelete && (
              <SecondaryButton onClick={viewModel.onDelete}>
                {t(texts.general.delete)}
              </SecondaryButton>
            )}
            <Button onClick={viewModel.onSave}>{t(texts.general.save)}</Button>
          </>
        )}
      </Toolbar>
      {props.children}
    </div>
  );
};
