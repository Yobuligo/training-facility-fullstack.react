import { ReactNode } from "react";
import { IEventInstanceShort } from "../../../shared/model/IEventInstanceShort";

export interface IEventInstanceItemProps {
  children?: ReactNode;
  eventInstanceShort: IEventInstanceShort;
}
