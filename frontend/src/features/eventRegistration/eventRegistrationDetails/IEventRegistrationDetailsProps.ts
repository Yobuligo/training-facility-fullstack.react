import { IEventInstance } from "../../../shared/model/IEventInstance";
import { IUserShort } from "../../../shared/model/IUserShort";

export interface IEventRegistrationDetailsProps {
  eventInstance: IEventInstance;
  isMemberOnly: boolean;
  onBack?: () => void;
  trainers: IUserShort[];
}
