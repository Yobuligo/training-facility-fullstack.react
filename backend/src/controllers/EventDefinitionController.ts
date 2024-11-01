import { Response } from "express";
import { HttpStatusCode } from "../core/api/types/HttpStatusCode";
import { IDateTimeSpan } from "../core/services/date/IDateTimeSpan";
import { EventDefinitionRepo } from "../repositories/EventDefinitionRepo";
import {
  EventDefinitionRouteMeta,
  IEventDefinition,
} from "../shared/model/IEventDefinition";
import { AuthRole } from "../shared/types/AuthRole";
import { PublicRouteMeta } from "../shared/types/PublicRouteMeta";
import { EntityController } from "./core/EntityController";
import { SessionInterceptor } from "./core/SessionInterceptor";
import { TokenInterceptor } from "./core/TokenInterceptor";
import { ISessionRequest } from "./core/types/ISessionRequest";

export class EventDefinitionController extends EntityController<
  IEventDefinition,
  EventDefinitionRepo
> {
  constructor() {
    super(EventDefinitionRouteMeta, new EventDefinitionRepo(), [
      AuthRole.ADMIN,
    ]);
    this.findByDateTimeSpanPublic();
    this.findTrainers();
  }

  protected findAll(): void {
    this.router.get(
      this.routeMeta.path,
      SessionInterceptor(async (req, res) => {
        const fields = this.getFieldsFromQuery(req.query);
        const from = req.query.from;
        const to = req.query.to;
        const requestedUserId = req.query.userId;

        if (from && typeof from === "string" && to && typeof to === "string") {
          await this.findByDateTimeSpan(
            req,
            res,
            from,
            to,
            requestedUserId,
            fields
          );
        } else {
          const eventInstances = await this.repo.findAll(fields);
          res.status(HttpStatusCode.OK_200).send(eventInstances);
        }
      })
    );
  }

  private async findByDateTimeSpanPublic() {
    this.router.get(
      `${PublicRouteMeta.path}${EventDefinitionRouteMeta.path}`,
      TokenInterceptor(async (req, res) => {
        const from = req.query.from;
        const to = req.query.to;
        const isMemberOnly = req.query.isMemberOnly === "true" ? true : false;

        if (
          !(from && typeof from === "string") ||
          !(to && typeof to === "string")
        ) {
          return res.status(HttpStatusCode.BAD_REQUEST_400).end();
        }

        const dateTimeSpan: IDateTimeSpan = {
          from: new Date(from),
          to: new Date(to),
        };

        let eventDefinitions = await this.repo.findByDateTimeSpanAndInstances(
          dateTimeSpan
        );

        if (isMemberOnly) {
          eventDefinitions = eventDefinitions.filter(
            (eventDefinition) => eventDefinition.isMemberOnly === false
          );
        }
        res.status(HttpStatusCode.OK_200).send(eventDefinitions);
      })
    );
  }

  /**
   * Returns the possible trainers for this event definition.
   */
  private findTrainers() {
    this.router.get(
      `${this.routeMeta.path}/:id/trainers`,
      SessionInterceptor(async (req, res) => {
        const eventDefinitionId = req.params.id;
        const trainers = await this.repo.findTrainers(eventDefinitionId);
        res.status(HttpStatusCode.OK_200).send(trainers);
      })
    );
  }

  private async findByDateTimeSpan(
    req: ISessionRequest,
    res: Response,
    from: string,
    to: string,
    requestedUserId: any,
    fields: (keyof IEventDefinition)[]
  ) {
    const dateTimeSpan: IDateTimeSpan = {
      from: new Date(from),
      to: new Date(to),
    };

    let eventDefinitions: IEventDefinition[];
    if (requestedUserId && typeof requestedUserId === "string") {
      await this.findByDateTimeSpanAndUser(
        req,
        res,
        dateTimeSpan,
        requestedUserId,
        fields
      );
    } else {
      eventDefinitions = await this.repo.findByDateTimeSpan(
        dateTimeSpan,
        fields
      );
      res.status(HttpStatusCode.OK_200).send(eventDefinitions);
    }
  }

  private async findByDateTimeSpanAndUser(
    req: ISessionRequest,
    res: Response,
    dateTimeSpan: IDateTimeSpan,
    requestedUserId: string,
    fields: (keyof IEventDefinition)[]
  ) {
    const isAdminOrYourSelf = await req.sessionInfo.isAdminOrYourself(
      requestedUserId
    );
    if (!isAdminOrYourSelf) {
      return this.sendMissingAuthorityError(res);
    }

    const eventDefinitions = await this.repo.findByDateTimeSpanAndUser(
      dateTimeSpan,
      requestedUserId,
      fields
    );
    res.status(HttpStatusCode.OK_200).send(eventDefinitions);
  }
}
