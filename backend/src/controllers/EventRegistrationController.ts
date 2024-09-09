import { HttpStatusCode } from "../core/api/types/HttpStatusCode";
import { EventInstanceRouteMeta } from "../shared/model/IEventInstance";
import {
  EventRegistrationRouteMeta,
  IEventRegistration,
} from "../shared/model/IEventRegistration";
import { AuthRole } from "../shared/types/AuthRole";
import { EventRegistrationRepo } from "./../repositories/EventRegistrationRepo";
import { EntityController } from "./core/EntityController";
import { SessionInterceptor } from "./core/SessionInterceptor";

export class EventRegistrationController extends EntityController<
  IEventRegistration,
  EventRegistrationRepo
> {
  constructor() {
    super(EventRegistrationRouteMeta, new EventRegistrationRepo(), [
      AuthRole.ADMIN,
    ]);
    this.findByInstanceId();
  }

  protected deleteById(): void {
    // no authorities required
    super.deleteById();
  }

  protected insert(): void {
    // no authorities required
    super.insert();
  }

  private findByInstanceId() {
    this.router.get(
      `${EventInstanceRouteMeta.path}/:id${EventRegistrationRouteMeta.path}`,
      SessionInterceptor(async (req, res) => {
        const eventInstanceId = req.params.id;
        const eventRegistrationRepo = new EventRegistrationRepo();
        const eventRegistrations =
          await eventRegistrationRepo.findByEventInstanceId(eventInstanceId);
        res.status(HttpStatusCode.OK_200).send(eventRegistrations);
      })
    );
  }
}
