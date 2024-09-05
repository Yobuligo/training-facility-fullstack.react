import { ReactNode } from "react";
import { IEventDefinition } from "../../../shared/model/IEventDefinition";
import { IEventInstance } from "../../../shared/model/IEventInstance";

export interface IEventInstanceItemProps {
  children?: ReactNode;
  eventDefinition: IEventDefinition;
  eventInstance: IEventInstance;
}
