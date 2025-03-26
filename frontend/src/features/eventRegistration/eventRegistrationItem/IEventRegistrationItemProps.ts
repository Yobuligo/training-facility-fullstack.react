import { ReactNode } from "react";
import { IUserProfile } from "../../../shared/model/IUserProfile";

export interface IEventRegistrationItemProps {
  children?: ReactNode;
  text?: string;
  userProfile?: IUserProfile;
}
