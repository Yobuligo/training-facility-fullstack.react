import { ReactNode } from "react";
import { IEventInstanceItemModelAndRole } from "../../../shared/model/IEventInstanceItemModelAndRole";

export interface IEventInstanceListProps {
  eventInstanceItemModelAndRoles: IEventInstanceItemModelAndRole[];
  onClick?: (eventInstanceItem: IEventInstanceItemModelAndRole) => void;
  renderChild?: (
    eventInstanceItemModelAndRole: IEventInstanceItemModelAndRole
  ) => ReactNode;
}
