import { IEvent } from "../model/IEvent";

export interface IEventMyTrainingsContentProps {
  event: IEvent;
  isRegistered: boolean;
  onRegister?: () => void;
  onUnregister?: () => void;
  userId: string;
}
