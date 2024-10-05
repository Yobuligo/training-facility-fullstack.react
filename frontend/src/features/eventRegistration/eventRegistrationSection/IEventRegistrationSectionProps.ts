import { IEventInstance } from "../../../shared/model/IEventInstance";
import { Boolean } from "../../../shared/types/Boolean";

export interface IEventRegistrationSectionProps {
  eventInstance: IEventInstance;
  isMemberOnly: Boolean;
}
