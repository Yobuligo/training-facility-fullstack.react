import { IDateTimeSpan } from "../core/services/date/IDateTimeSpan";
import { EventDefinitionRepo } from "../repositories/EventDefinitionRepo";
import {
  EventDefinitionRouteMeta,
  IEventDefinition,
} from "../shared/model/IEventDefinition";
import { EntityController } from "./core/EntityController";
import { SessionInterceptor } from "./core/SessionInterceptor";

export class EventDefinitionController extends EntityController<
  IEventDefinition,
  EventDefinitionRepo
> {
  constructor() {
    super(EventDefinitionRouteMeta, new EventDefinitionRepo());
  }

  protected findAll(): void {
    this.router.get(
      this.routeMeta.path,
      SessionInterceptor(async (req, res) => {
        const from = req.query.from;
        const to = req.query.to;

        if (from && typeof from === "string" && to && typeof to === "string") {
          const fields = this.getFieldsFromQuery(req.query);
          const dateTimeSpan: IDateTimeSpan = {
            from: new Date(from),
            to: new Date(to),
          };
          const entities = await this.repo.findByDateTimeSpan(
            dateTimeSpan,
            fields
          );
          res.status(200).send(entities);
        } else {
          const fields = this.getFieldsFromQuery(req.query);
          const entities = await this.repo.findAll(fields);
          res.status(200).send(entities);
        }
      })
    );
  }
}
