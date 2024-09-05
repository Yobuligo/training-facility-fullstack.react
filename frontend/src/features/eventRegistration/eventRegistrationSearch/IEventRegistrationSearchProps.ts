import { IUser } from "../../../shared/model/IUser";

export interface IEventRegistrationSearchProps {
  className?: string;
  onAddUser?: (user: IUser) => void;
}
