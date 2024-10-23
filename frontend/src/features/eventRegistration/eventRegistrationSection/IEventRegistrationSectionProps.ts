import { IEventInstance } from "../../../shared/model/IEventInstance";
import { IUserShort } from "../../../shared/model/IUserShort";

export interface IEventRegistrationSectionProps {
  eventInstance: IEventInstance;
  isMemberOnly: boolean;
  trainers: IUserShort[];
}
