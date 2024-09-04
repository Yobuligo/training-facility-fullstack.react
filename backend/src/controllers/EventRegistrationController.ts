import { EventRegistrationRepo } from "../repositories/EventRegistrationRepo";
import {
  EventRegistrationRouteMeta,
  IEventRegistration,
} from "../shared/model/IEventRegistration";
import { EntityController } from "./core/EntityController";

export class EventRegistrationController extends EntityController<
  IEventRegistration,
  EventRegistrationRepo
> {
  constructor() {
    super(EventRegistrationRouteMeta, new EventRegistrationRepo());
  }
}
