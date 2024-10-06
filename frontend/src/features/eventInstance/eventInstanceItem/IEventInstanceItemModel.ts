import { IHaveId } from "../../../core/api/types/IHaveId";
import { Boolean } from "../../../shared/types/Boolean";

export interface IEventInstanceItemModel extends IHaveId {
  color: string;
  from: Date;
  isMemberOnly?: Boolean;
  calledOff?: boolean;
  title: string;
  to: Date;
}
