export interface IUserLoginAttempt {
  lastFailAttempt: Date;
  lockedUntil?: Date;
  numberFailAttempts: number;
  userId: string;
}
