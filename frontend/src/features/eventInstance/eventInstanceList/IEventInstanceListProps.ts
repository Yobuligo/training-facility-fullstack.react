import { ReactNode } from "react";
import { IEventInstanceItemModelAndRole } from "../../../shared/model/IEventInstanceItemModelAndRole";

export interface IEventInstanceListProps {
  eventInstanceItemModelAndRoles: IEventInstanceItemModelAndRole[];
  renderChild?: (
    eventInstanceItemModelAndRole: IEventInstanceItemModelAndRole
  ) => ReactNode;
}
