import { IHaveId } from "../../core/api/types/IHaveId";

export interface IEventInstanceShort extends IHaveId {
  color: string;
  from: Date;
  title: string;
  to: Date;
}
