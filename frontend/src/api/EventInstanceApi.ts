import {
  EventInstanceRouteMeta,
  IEventInstance,
} from "../shared/model/IEventInstance";
import { Repository } from "./core/Repository";

export class EventInstanceApi extends Repository<IEventInstance> {
  constructor() {
    super(EventInstanceRouteMeta);
  }
}
