import { HttpStatusCode } from "../core/api/types/HttpStatusCode";
import { IDateTimeSpan } from "../core/services/date/IDateTimeSpan";
import { createError } from "../core/utils/createError";
import { EventDefinitionRepo } from "../repositories/EventDefinitionRepo";
import { EventInstanceRepo } from "../repositories/EventInstanceRepo";
import { EventDefinitionRouteMeta } from "../shared/model/IEventDefinition";
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
    this.findDefinitionByInstanceId();
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

  private findDefinitionByInstanceId() {
    this.router.get(
      `${this.routeMeta.path}/:id${EventDefinitionRouteMeta.path}`,
      SessionInterceptor(async (req, res) => {
        const requestedUserId = req.query.userId;
        if (!requestedUserId || !(typeof requestedUserId === "string")) {
          return res
            .status(HttpStatusCode.BAD_REQUEST_400)
            .send(
              createError(
                "Error while getting event definition by event instance id and user id. The user id is invalid."
              )
            );
        }
        if (!this.checkIsAdminOrYourself(req, res, requestedUserId)) {
          return;
        }

        const eventInstanceId = req.params.id;
        const eventDefinitionRepo = new EventDefinitionRepo();
        const eventDefinition =
          await eventDefinitionRepo.findByEventInstanceAndUser(
            eventInstanceId,
            requestedUserId
          );
        if (eventDefinition) {
          res.status(HttpStatusCode.OK_200).send(eventDefinition);
        } else {
          res
            .status(HttpStatusCode.NOT_FOUND_404)
            .send(createError("Not found", "NotFoundError"));
        }
      })
    );
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
