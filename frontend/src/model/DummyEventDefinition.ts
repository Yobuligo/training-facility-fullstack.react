import { DateTime } from "../core/services/date/DateTime";
import { Recurrence } from "../core/types/Recurrence";
import { IEventDefinition } from "../shared/model/IEventDefinition";
import { IEventInstance } from "../shared/model/IEventInstance";
import colors from "../styles/colors.module.scss";
import { uuid } from "../utils/uuid";
import { Dummy } from "./Dummy";

export class DummyEventDefinition extends Dummy implements IEventDefinition {
  eventInstances: IEventInstance[] = [];
  color: string = colors.colorEventDefinition1;
  description: string = "";
  recurrence: Recurrence = Recurrence.ONCE;
  title: string = "";
  id: string = uuid();
  createdAt: Date = new Date();
  updatedAt: Date = new Date();
  from: Date = DateTime.create(DateTime.toDate(new Date()), "18:00:00");
  to: Date = DateTime.create(DateTime.toDate(new Date()), "19:00:00");

  constructor(public creatorUserId: string) {
    super();
  }
}
