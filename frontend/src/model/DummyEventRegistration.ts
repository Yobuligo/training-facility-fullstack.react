import { IEventInstance } from "../shared/model/IEventInstance";
import { IEventRegistration } from "../shared/model/IEventRegistration";
import { IUserProfile } from "../shared/model/IUserProfile";
import { EventState } from "../shared/types/EventState";
import { uuid } from "../utils/uuid";
import { Dummy } from "./Dummy";

export class DummyEventRegistration
  extends Dummy
  implements IEventRegistration
{
  id: string = uuid();
  createdAt: Date = new Date();
  updatedAt: Date = new Date();
  eventInstanceId: string;
  userId: string;

  constructor(
    public eventInstance: IEventInstance,
    public eventState: EventState,
    public userProfile: IUserProfile
  ) {
    super();
    this.eventInstanceId = eventInstance.id;
    this.userId = userProfile?.userId;
  }
}
