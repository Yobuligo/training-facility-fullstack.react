import { DateTime } from "../core/services/date/DateTime";
import { IEventDefinition } from "../shared/model/IEventDefinition";
import { Recurrence } from "../shared/types/Recurrence";
import colors from "../styles/colors.module.scss";
import { uuid } from "../utils/uuid";
import { Dummy } from "./Dummy";

export class DummyEventDefinition extends Dummy implements IEventDefinition {
  color: string = colors.colorPrimary;
  creator: string = "";
  description: string = "";
  recurrence: Recurrence = Recurrence.ONCE;
  title: string = "";
  id: string = uuid();
  createdAt: Date = new Date();
  updatedAt: Date = new Date();
  from: Date = DateTime.create(DateTime.toDate(new Date()), "18:00:00");
  to: Date = DateTime.create(DateTime.toDate(new Date()), "19:00:00");
}
