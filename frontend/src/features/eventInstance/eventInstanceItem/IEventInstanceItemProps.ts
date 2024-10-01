import { ReactNode } from "react";
import { IEventInstanceItemModel } from "./IEventInstanceItemModel";

export interface IEventInstanceItemProps {
  children?: ReactNode;
  classNameChildren?: string;
  eventInstanceItemModel: IEventInstanceItemModel;
  onClick?: () => void;
  renderChildrenInline?: boolean;
}
