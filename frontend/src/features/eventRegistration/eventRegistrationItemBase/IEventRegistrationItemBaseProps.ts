import { ReactNode } from "react";
import { IUserProfile } from "../../../shared/model/IUserProfile";

export interface IEventRegistrationItemBaseProps {
  children?: ReactNode;
  text?: string;
  userProfile?: IUserProfile;
}
