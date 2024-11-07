import { ReactNode } from "react";
import { IEventInstanceItemModel } from "../eventInstanceItem/IEventInstanceItemModel";

export interface IEventInstanceListProps {
  eventInstanceItemModels: IEventInstanceItemModel[];
  renderChild?: (eventInstanceItemModel: IEventInstanceItemModel) => ReactNode;
}
