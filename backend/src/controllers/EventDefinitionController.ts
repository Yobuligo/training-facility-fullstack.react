import { Response } from "express";
import { HttpStatusCode } from "../core/api/types/HttpStatusCode";
import { IDateTimeSpan } from "../core/services/date/IDateTimeSpan";
import { createError } from "../core/utils/createError";
import { EventDefinitionRepo } from "../repositories/EventDefinitionRepo";
import {
  EventDefinitionRouteMeta,
  IEventDefinition,
} from "../shared/model/IEventDefinition";
import { AuthRole } from "../shared/types/AuthRole";
import { EntityController } from "./core/EntityController";
import { SessionInterceptor } from "./core/SessionInterceptor";
import { ISessionRequest } from "./core/types/ISessionRequest";

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

  protected insert(): void {
    super.insert([AuthRole.ADMIN]);
  }

  protected update(): void {
    super.update([AuthRole.ADMIN]);
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
    const isAdminOrYourSelf = await req.isAdminOrYourself(requestedUserId);
    if (!isAdminOrYourSelf) {
      return res
        .status(HttpStatusCode.FORBIDDEN_403)
        .send(createError("Missing authority", "MissingAuthorityError"));
    }

    const eventDefinitions = await this.repo.findByDateTimeSpanAndUser(
      dateTimeSpan,
      requestedUserId,
      fields
    );
    res.status(HttpStatusCode.OK_200).send(eventDefinitions);
  }
}
