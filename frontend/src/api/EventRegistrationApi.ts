import {
  EventRegistrationRouteMeta,
  IEventRegistration,
} from "../shared/model/IEventRegistration";
import { Repository } from "./core/Repository";

export class EventRegistrationApi extends Repository<IEventRegistration> {
  constructor() {
    super(EventRegistrationRouteMeta);
  }
}
