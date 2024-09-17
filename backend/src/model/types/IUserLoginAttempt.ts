export interface IUserLoginAttempt {
  userId: string;
  numberFailAttempts: number;
  lastFailAttempt: Date;
}
