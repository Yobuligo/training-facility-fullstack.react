import { ReactNode } from "react";
import { IEventInstanceItemModel } from "../../../shared/model/IEventInstanceItemModel";

export interface IEventInstanceItemProps {
  children?: ReactNode;
  classNameChildren?: string;

  /**
   * Defines if a cursor should be displayed when hovering over the event instance item. Default is false.
   */
  displayCursor?: boolean;

  eventInstanceItemModel: IEventInstanceItemModel;
  onClick?: () => void;

  /**
   * If true the given {@link children} are rendered in the row of the banner, otherwise the given {@link children} are rendered below.
   */
  renderChildrenInline?: boolean;
}
