import { ReactNode } from "react";
import { IEventDefinition } from "../../../shared/model/IEventDefinition";

export interface IEventContentProps {
  className?: string;
  children?: ReactNode;
  eventDefinition: IEventDefinition;
}
