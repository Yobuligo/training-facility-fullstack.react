export interface IUserLoginFailAttempt {
  lastFailAttempt: Date;
  lockedUntil?: Date;
  numberFailAttempts: number;
  userId: string;
}
