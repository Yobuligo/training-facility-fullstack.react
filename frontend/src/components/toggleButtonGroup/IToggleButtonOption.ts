import { ReactNode } from "react";

export interface IToggleButtonOption<TKey> {
  key: TKey;
  text: string | ReactNode;
}
