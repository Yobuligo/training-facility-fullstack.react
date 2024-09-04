import { EventInstanceRepo } from "../repositories/EventInstanceRepo";
import {
  EventInstanceRouteMeta,
  IEventInstance,
} from "../shared/model/IEventInstance";
import { EntityController } from "./core/EntityController";

export class EventInstanceController extends EntityController<
  IEventInstance,
  EventInstanceRepo
> {
  constructor() {
    super(EventInstanceRouteMeta, new EventInstanceRepo());
  }
}
