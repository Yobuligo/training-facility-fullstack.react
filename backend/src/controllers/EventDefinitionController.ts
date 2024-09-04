import { EventDefinitionRepo } from "../repositories/EventDefinitionRepo";
import {
  EventDefinitionRouteMeta,
  IEventDefinition,
} from "../shared/model/IEventDefinition";
import { EntityController } from "./core/EntityController";

export class EventDefinitionController extends EntityController<
  IEventDefinition,
  EventDefinitionRepo
> {
  constructor() {
    super(EventDefinitionRouteMeta, new EventDefinitionRepo());
  }
}
