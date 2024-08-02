import { IHaveDisplayMode } from "../../../types/IHaveDisplayMode";

export interface IGradingSectionProps extends IHaveDisplayMode {
  isAdminMode: boolean;
  userId: string;
}
