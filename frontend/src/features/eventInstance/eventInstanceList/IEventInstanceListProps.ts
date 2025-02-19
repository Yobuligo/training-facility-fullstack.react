import { ReactNode } from "react";
import { IEventInstanceItemModelAndRole } from "../../../shared/model/IEventInstanceItemModelAndRole";

export interface IEventInstanceListProps {
  eventInstanceItemModelAndRoles: IEventInstanceItemModelAndRole[];

  /**
   * Defines if a cursor should be displayed when hovering over an event instance item. Default is false.
   */
  displayCursor?: boolean;

  onClick?: (eventInstanceItem: IEventInstanceItemModelAndRole) => void;
  renderChild?: (
    eventInstanceItemModelAndRole: IEventInstanceItemModelAndRole
  ) => ReactNode;
}
