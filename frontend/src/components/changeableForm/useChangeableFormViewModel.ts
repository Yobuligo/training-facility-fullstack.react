import { texts } from "../../lib/translation/texts";
import { useTranslation } from "../../lib/translation/useTranslation";
import { IChangeableFormProps } from "./IChangeableFormProps";

export const useChangeableFormViewModel = (props: IChangeableFormProps) => {
  const { t } = useTranslation();
  const onCancel = () => {
    props.setDisplayMode(true);
    props.onCancel?.();
  };

  const onDelete = () => {
    if (
      window.confirm(props.deleteQuestion ?? t(texts.general.deleteQuestion))
    ) {
      props.onDelete?.();
    }
  };

  const onSave = async () => {
    try {
      await props.onValidate?.();
      props.setDisplayMode(true);
      await props.onSave?.();
    } catch (error) {
      // do nothing
    }
  };

  const onToggleMode = () => props.setDisplayMode((previous) => !previous);

  return { onCancel, onDelete, onToggleMode, onSave };
};
