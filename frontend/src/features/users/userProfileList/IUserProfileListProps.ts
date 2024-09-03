import { IUserShort } from "../../../shared/model/IUserShort";

export interface IUserProfileListProps {
  onSelect?: (userShort: IUserShort) => void;
  usersShort: IUserShort[];
}
