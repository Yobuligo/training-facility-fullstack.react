import { IUserProfile } from "../../../shared/model/IUserProfile";

export interface IEventRegistrationSearchProps {
  className?: string;
  onAddUserProfile?: (userProfile: IUserProfile) => void;
}
