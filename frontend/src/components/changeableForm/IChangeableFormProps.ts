import { ReactNode } from "react";

export interface IChangeableFormProps {
  children?: ReactNode;
  deleteQuestion?: string;
  displayDelete?: boolean;
  displayMode: boolean;
  displaySaveSpinner?: boolean;
  onCancel?: () => void;
  onDelete?: () => void;
  onSave?: () => Promise<void> | void;
  onValidate?: () => Promise<void> | void;
  setDisplayMode: (value: React.SetStateAction<boolean>) => void;
}
