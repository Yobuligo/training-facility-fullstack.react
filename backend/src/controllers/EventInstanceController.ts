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
import { UserRouteMeta } from "../shared/model/IUser";
import { AuthRole } from "../shared/types/AuthRole";
import { ITrainer, TrainerRouteMeta } from "../shared/types/ITrainer";
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
    this.findAllWithRole();
    this.findDefinitionByInstanceId();
    this.findDefinitionByInstanceAndUser();
    this.findTrainers();
    this.insertPublic();
    this.updateTrainers();
  }

  protected insert(): void {
    // no authorities required
    super.insert();
  }

  /**
   * Finds all event instance where the user is registered on or the user is assigned to.
   */
  private findAllWithRole() {
    this.router.get(
      `${this.routeMeta.path}/all/with-role`,
      SessionInterceptor(async (req, res) => {
        const from = req.query.from;
        const to = req.query.to;
        const userId = req.query.userId;

        if (
          typeof userId !== "string" ||
          typeof from !== "string" ||
          typeof to !== "string"
        ) {
          return res.status(HttpStatusCode.BAD_REQUEST_400).end();
        }

        if (!(await req.sessionInfo.isAdminOrYourself(userId))) {
          return this.sendMissingAuthorityError(res);
        }

        const dateTimeSpan: IDateTimeSpan = {
          from: new Date(from),
          to: new Date(to),
        };

        const eventInstanceAndRoles = await this.repo.findByDateTimeSpanAndUser(
          dateTimeSpan,
          userId
        );
        res.status(HttpStatusCode.OK_200).send(eventInstanceAndRoles);
      })
    );
  }

  /**
   * Finds an EventDefinition by the corresponding EventInstanceId and an UserId.
   */
  private findDefinitionByInstanceAndUser() {
    this.router.get(
      `${this.routeMeta.path}/:id${UserRouteMeta.path}/:userId${EventDefinitionRouteMeta.path}`,
      SessionInterceptor(async (req, res) => {
        const requestedUserId = req.params.userId;
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

  /**
   * Finds an EventDefinition by the corresponding EventInstanceId.
   */
  private findDefinitionByInstanceId() {
    this.router.get(
      `${this.routeMeta.path}/:id${EventDefinitionRouteMeta.path}`,
      SessionInterceptor(
        async (req, res) => {
          const eventInstanceId = req.params.id;
          const eventDefinitionRepo = new EventDefinitionRepo();
          const eventDefinition =
            await eventDefinitionRepo.findByEventInstanceId(eventInstanceId);
          if (eventDefinition) {
            res.status(HttpStatusCode.OK_200).send(eventDefinition);
          } else {
            res
              .status(HttpStatusCode.NOT_FOUND_404)
              .send(createError("Not found", "NotFoundError"));
          }
        },
        [AuthRole.ADMIN]
      )
    );
  }

  /**
   * Returns the possible trainers for an event instance.
   */
  private findTrainers() {
    this.router.get(
      `${this.routeMeta.path}/:id/trainers`,
      SessionInterceptor(async (req, res) => {
        const eventInstanceId = req.params.id;
        const trainers = await this.repo.findTrainers(eventInstanceId);
        res.status(HttpStatusCode.OK_200).send(trainers);
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

  private updateTrainers() {
    this.router.put(
      `${this.routeMeta.path}/:id${TrainerRouteMeta.path}`,
      SessionInterceptor(async (req, res) => {
        const eventInstanceId = req.params.id;
        const trainers: ITrainer[] = req.body;
        const eventInstanceRepo = new EventInstanceRepo();
        await eventInstanceRepo.updateTrainers(eventInstanceId, trainers);
        res.status(HttpStatusCode.OK_200).send(true);
      })
    );
  }
}
