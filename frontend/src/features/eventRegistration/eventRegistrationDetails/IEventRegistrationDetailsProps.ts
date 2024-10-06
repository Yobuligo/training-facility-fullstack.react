import { IEventInstance } from "../../../shared/model/IEventInstance";

export interface IEventRegistrationDetailsProps {
  eventInstance: IEventInstance;
  isMemberOnly: boolean;
  onBack?: () => void;
}
