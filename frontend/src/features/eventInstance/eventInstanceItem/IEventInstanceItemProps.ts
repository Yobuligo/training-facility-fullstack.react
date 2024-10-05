import { ReactNode } from "react";
import { Boolean } from "../../../shared/types/Boolean";
import { IEventInstanceItemModel } from "./IEventInstanceItemModel";

export interface IEventInstanceItemProps {
  children?: ReactNode;
  classNameChildren?: string;
  eventInstanceItemModel: IEventInstanceItemModel;
  isMemberOnly?: Boolean;
  onClick?: () => void;
  renderChildrenInline?: boolean;
}
