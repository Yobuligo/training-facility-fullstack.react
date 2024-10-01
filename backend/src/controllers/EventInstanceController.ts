import { HttpStatusCode } from "../core/api/types/HttpStatusCode";
import { IDateTimeSpan } from "../core/services/date/IDateTimeSpan";
import { EventInstanceRepo } from "../repositories/EventInstanceRepo";
import {
  EventInstanceRouteMeta,
  IEventInstance,
} from "../shared/model/IEventInstance";
import { AuthRole } from "../shared/types/AuthRole";
import { PublicRouteMeta } from "../shared/types/PublicRouteMeta";
import { EntityController } from "./core/EntityController";
import { SessionInterceptor } from "./core/SessionInterceptor";
import { TokenInterceptor } from "./core/TokenInterceptor";

export class EventInstanceController extends EntityController<
  IEventInstance,
  EventInstanceRepo
> {
  constructor() {
    super(EventInstanceRouteMeta, new EventInstanceRepo(), [AuthRole.ADMIN]);
    this.insertPublic();
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
          if (!(await req.sessionInfo.isAdminOrYourself(userId))) {
            return this.sendMissingAuthorityError(res);
          }

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
          if (!(await req.sessionInfo.isAdmin())) {
            return this.sendMissingAuthorityError(res);
          }

          const eventInstances = await this.repo.findAll(fields);
          res.status(HttpStatusCode.OK_200).send(eventInstances);
        }
      })
    );
  }

  protected insert(): void {
    // no authorities required
    super.insert();
  }

  private insertPublic() {
    this.router.post(
      `${PublicRouteMeta.path}${this.routeMeta.path}`,
      TokenInterceptor(async (req, res) => {
        const eventInstance: IEventInstance = req.body;
        const eventInstanceRepo = new EventInstanceRepo();
        const createdEventInstance = await eventInstanceRepo.insert(
          eventInstance
        );
        res.status(HttpStatusCode.CREATED_201).send(createdEventInstance);
      })
    );
  }
}
