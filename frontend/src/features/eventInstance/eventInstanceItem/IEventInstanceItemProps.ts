import { ReactNode } from "react";
import { IEventInstance } from "../../../shared/model/IEventInstance";

export interface IEventInstanceItemProps {
  children?: ReactNode;
  eventInstance: IEventInstance;
}
