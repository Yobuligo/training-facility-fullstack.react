import { AppConfig } from "../AppConfig";
import { DateTime } from "../core/services/date/DateTime";
import { IUserLoginFailAttempt } from "../model/types/IUserLoginFailAttempt";
import { LoginNotPossibleError } from "../shared/errors/LoginNotPossibleError";

export class UserLoginFailAttemptService {
  check(userLoginFailAttempt?: IUserLoginFailAttempt) {
    // check if we have fail attempts
    if (!userLoginFailAttempt) {
      return;
    }

    if (this.isBelowTemporaryBlocked(userLoginFailAttempt)) {
      return;
    }

    if (this.isTemporaryBlocked(userLoginFailAttempt)) {
      throw new LoginNotPossibleError();
    }

    if (this.isBelowPermanentlyBlocked(userLoginFailAttempt)) {
      return;
    }

    throw new LoginNotPossibleError();
  }

  private isBelowTemporaryBlocked(
    userLoginAttempt: IUserLoginFailAttempt
  ): boolean {
    return (
      userLoginAttempt.numberFailAttempts <
      AppConfig.userNumberAttemptsToTemporaryBlock
    );
  }

  private isTemporaryBlocked(userLoginAttempt: IUserLoginFailAttempt): boolean {
    return (
      userLoginAttempt.lockedUntil !== undefined &&
      DateTime.isAfter(userLoginAttempt.lockedUntil)
    );
  }

  private isBelowPermanentlyBlocked(
    userLoginAttempt: IUserLoginFailAttempt
  ): boolean {
    return (
      userLoginAttempt.numberFailAttempts <
      AppConfig.userNumberAttemptsToPermanentlyLock
    );
  }
}
