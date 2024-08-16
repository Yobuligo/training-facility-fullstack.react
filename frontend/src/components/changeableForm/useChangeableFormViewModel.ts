import { useState } from "react";
import { IChangeableFormProps } from "./IChangeableFormProps";

export const useChangeableFormViewModel = (props: IChangeableFormProps) => {
  const [displayMode, setDisplayMode] = useState(props.displayMode ?? true);

  const onCancel = () => {
    setDisplayMode(true);
    props.onCancel?.();
  };

  const onSave = () => props.onSave?.();

  const onToggleMode = () => setDisplayMode((previous) => !previous);

  return { displayMode, onCancel, onToggleMode, onSave };
};
