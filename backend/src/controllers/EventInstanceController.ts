import { HttpStatusCode } from "../core/api/types/HttpStatusCode";
import { IDateTimeSpan } from "../core/services/date/IDateTimeSpan";
import { EventInstanceRepo } from "../repositories/EventInstanceRepo";
import {
  EventInstanceRouteMeta,
  IEventInstance,
} from "../shared/model/IEventInstance";
import { EntityController } from "./core/EntityController";
import { SessionInterceptor } from "./core/SessionInterceptor";

export class EventInstanceController extends EntityController<
  IEventInstance,
  EventInstanceRepo
> {
  constructor() {
    super(EventInstanceRouteMeta, new EventInstanceRepo());
  }

  protected findAll(): void {
    this.router.get(
      this.routeMeta.path,
      SessionInterceptor(async (req, res) => {
        const fields = this.getFieldsFromQuery(req.query);
        const from = req.query.from;
        const to = req.query.to;
        const userId = req.query.userId;

        if (
          from &&
          typeof from === "string" &&
          to &&
          typeof to === "string" &&
          userId &&
          typeof userId === "string"
        ) {
          const dateTimeSpan: IDateTimeSpan = {
            from: new Date(from),
            to: new Date(to),
          };

          const eventInstances = await this.repo.findByDateTimeSpanAndUser(
            dateTimeSpan,
            userId,
            fields
          );

          res.status(HttpStatusCode.OK_200).send(eventInstances);
        } else {
          const eventInstances = await this.repo.findAll(fields);
          res.status(HttpStatusCode.OK_200).send(eventInstances);
        }
      })
    );
  }
}
