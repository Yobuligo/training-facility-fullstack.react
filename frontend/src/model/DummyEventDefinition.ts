import { IEventDefinition } from "../shared/model/IEventDefinition";
import { Recurrence } from "../shared/types/Recurrence";
import { uuid } from "../utils/uuid";
import { Dummy } from "./Dummy";

export class DummyEventDefinition extends Dummy implements IEventDefinition {
  creator: string = "";
  description: string = "";
  recurrence: Recurrence = Recurrence.ONCE;
  title: string = "";
  id: string = uuid();
  createdAt: Date = new Date();
  updatedAt: Date = new Date();
  from: Date = new Date();
  to: Date = new Date();
}
