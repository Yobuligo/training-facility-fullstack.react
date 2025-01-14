import { IHaveId } from "../../core/api/types/IHaveId";

export interface IEventInstanceItemModel extends IHaveId {
  color: string;
  description: string;
  from: Date;
  isMemberOnly?: boolean;
  calledOff?: boolean;
  title: string;
  to: Date;
}
