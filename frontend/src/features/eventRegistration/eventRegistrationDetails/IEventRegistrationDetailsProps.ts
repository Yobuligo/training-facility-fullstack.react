import { IEventInstance } from "../../../shared/model/IEventInstance";
import { Boolean } from "../../../shared/types/Boolean";

export interface IEventRegistrationDetailsProps {
  eventInstance: IEventInstance;
  isMemberOnly: Boolean;
  onBack?: () => void;
}
