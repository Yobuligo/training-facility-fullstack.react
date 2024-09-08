import { IDateTimeSpan } from "../core/services/date/IDateTimeSpan";
import { EventDefinitionRepo } from "../repositories/EventDefinitionRepo";
import {
  EventDefinitionRouteMeta,
  IEventDefinition,
} from "../shared/model/IEventDefinition";
import { AuthRole } from "../shared/types/AuthRole";
import { EntityController } from "./core/EntityController";
import { SessionInterceptor } from "./core/SessionInterceptor";

export class EventDefinitionController extends EntityController<
  IEventDefinition,
  EventDefinitionRepo
> {
  constructor() {
    super(EventDefinitionRouteMeta, new EventDefinitionRepo());
  }

  protected deleteById(): void {
    super.deleteById([AuthRole.ADMIN]);
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

          let eventDefinitions: IEventDefinition[];
          if (userId && typeof userId === "string") {
            eventDefinitions = await this.repo.findByDateTimeSpanAndUser(
              dateTimeSpan,
              userId,
              fields
            );
          } else {
            eventDefinitions = await this.repo.findByDateTimeSpan(
              dateTimeSpan,
              fields
            );
          }
          res.status(200).send(eventDefinitions);
        } else {
          const eventInstances = await this.repo.findAll(fields);
          res.status(200).send(eventInstances);
        }
      })
    );
  }

  protected insert(): void {
    super.insert([AuthRole.ADMIN]);
  }

  protected update(): void {
    super.update([AuthRole.ADMIN]);
  }
}
