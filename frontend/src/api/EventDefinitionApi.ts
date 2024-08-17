import { DateTime } from "../core/services/date/DateTime";
import { IDateTimeSpan } from "../core/services/date/IDateTimeSpan";
import {
  EventDefinitionRouteMeta,
  IEventDefinition,
} from "../shared/model/IEventDefinition";
import { Repository } from "./core/Repository";
import { DummyEventDefinitions } from "./DummyEventDefinitions";

export class EventDefinitionApi extends Repository<IEventDefinition> {
  constructor() {
    super(EventDefinitionRouteMeta);
  }

  async insert(data: IEventDefinition): Promise<IEventDefinition> {
    DummyEventDefinitions.push(data);
    return data;
  }

  async findByDateTimeSpan(
    dateTimeSpan: IDateTimeSpan
  ): Promise<IEventDefinition[]> {
    const eventDefinitions = DummyEventDefinitions.filter(
      (eventDefinition) =>
        DateTime.toDate(eventDefinition.from) >=
          DateTime.toDate(dateTimeSpan.from) &&
        DateTime.toDate(eventDefinition.to) <= DateTime.toDate(dateTimeSpan.to)
    );
    return eventDefinitions;
  }
}
