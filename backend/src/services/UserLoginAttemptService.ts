import { AppConfig } from "../AppConfig";
import { DateTime } from "../core/services/date/DateTime";
import { IUserLoginAttempt } from "../model/types/IUserLoginAttempt";
import { LoginNotPossibleError } from "../shared/errors/LoginNotPossibleError";

export class UserLoginAttemptService {
  check(userLoginAttempt?: IUserLoginAttempt) {
    // check if we have fail attempts
    if (!userLoginAttempt) {
      return;
    }

    if (this.isBelowTemporaryBlocked(userLoginAttempt)) {
      return;
    }

    if (this.isTemporaryBlocked(userLoginAttempt)) {
      throw new LoginNotPossibleError();
    }

    if (this.isBelowPermanentlyBlocked(userLoginAttempt)) {
      return;
    }

    throw new LoginNotPossibleError();
  }

  private isBelowTemporaryBlocked(
    userLoginAttempt: IUserLoginAttempt
  ): boolean {
    return (
      userLoginAttempt.numberFailAttempts <
      AppConfig.userNumberAttemptsToTemporaryBlock
    );
  }

  private isTemporaryBlocked(userLoginAttempt: IUserLoginAttempt): boolean {
    return (
      userLoginAttempt.lockedUntil !== undefined &&
      DateTime.isBefore(userLoginAttempt.lockedUntil)
    );
  }

  private isBelowPermanentlyBlocked(
    userLoginAttempt: IUserLoginAttempt
  ): boolean {
    return (
      userLoginAttempt.numberFailAttempts <
      AppConfig.userNumberAttemptsToPermanentlyLock
    );
  }
}
