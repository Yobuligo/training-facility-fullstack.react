import { Response } from "express";
import { HttpStatusCode } from "../core/api/types/HttpStatusCode";
import { IDateTimeSpan } from "../core/services/date/IDateTimeSpan";
import { EventDefinitionRepo } from "../repositories/EventDefinitionRepo";
import {
  EventDefinitionRouteMeta,
  IEventDefinition,
} from "../shared/model/IEventDefinition";
import { SecretRequestRouteMeta } from "../shared/model/ISecretRequest";
import { AuthRole } from "../shared/types/AuthRole";
import { EntityController } from "./core/EntityController";
import { SecretInterceptor } from "./core/SecretInterceptor";
import { SessionInterceptor } from "./core/SessionInterceptor";
import { ISessionRequest } from "./core/types/ISessionRequest";

export class EventDefinitionController extends EntityController<
  IEventDefinition,
  EventDefinitionRepo
> {
  constructor() {
    super(EventDefinitionRouteMeta, new EventDefinitionRepo(), [
      AuthRole.ADMIN,
    ]);
    this.findByDateTimeSpanSecured();
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

  private async findByDateTimeSpanSecured() {
    this.router.post(
      `${this.routeMeta.path}${SecretRequestRouteMeta.path}`,
      SecretInterceptor(async (req, res) => {
        const from = req.query.from;
        const to = req.query.to;

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

        const eventDefinitions = await this.repo.findByDateTimeSpan(
          dateTimeSpan
        );
        res.status(HttpStatusCode.OK_200).send(eventDefinitions);
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
