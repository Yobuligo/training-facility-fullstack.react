import { ReactNode } from "react";
import { IEventInstanceItemModelAndRole } from "./../eventInstanceItem/IEventInstanceItemModelAndRole";

export interface IEventInstanceListProps {
  eventInstanceItemModelAndRoles: IEventInstanceItemModelAndRole[];
  renderChild?: (
    eventInstanceItemModelAndRole: IEventInstanceItemModelAndRole
  ) => ReactNode;
}
