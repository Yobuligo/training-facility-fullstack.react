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
        const fields = this.getFieldsFromQuery(req.query);
        const from = req.query.from;
        const to = req.query.to;
        const userId = req.query.userId;

        if (from && typeof from === "string" && to && typeof to === "string") {
          const dateTimeSpan: IDateTimeSpan = {
            from: new Date(from),
            to: new Date(to),
          };

          let entities: IEventDefinition[];
          if (userId && typeof userId === "string") {
            entities = await this.repo.findByDateTimeSpanAndUser(
              dateTimeSpan,
              userId,
              fields
            );
          } else {
            entities = await this.repo.findByDateTimeSpan(dateTimeSpan, fields);
          }
          res.status(200).send(entities);
        } else {
          const entities = await this.repo.findAll(fields);
          res.status(200).send(entities);
        }
      })
    );
  }
}
