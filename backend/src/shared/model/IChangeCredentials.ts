import { ICredentials } from "./ICredentials";

export interface IChangeCredentials extends ICredentials {
  newPassword: string;
}
