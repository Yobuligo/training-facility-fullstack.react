import { ReactNode } from "react";
import { IEventDefinition } from "../../../shared/model/IEventDefinition";

export interface IEventCalendarContentProps {
  className?: string;
  children?: ReactNode;
  eventDefinition: IEventDefinition;
}
