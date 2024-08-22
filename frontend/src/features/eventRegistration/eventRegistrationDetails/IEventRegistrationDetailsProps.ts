import { IEventInstance } from "../../../shared/model/IEventInstance";

export interface IEventRegistrationDetailsProps {
  eventInstance: IEventInstance;
  onBack?: () => void;
}
