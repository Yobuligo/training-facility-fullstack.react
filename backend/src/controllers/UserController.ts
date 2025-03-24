import { HttpStatusCode } from "../core/api/types/HttpStatusCode";
import { createError } from "../core/utils/createError";
import { IUserSecure } from "../model/types/IUserSecure";
import { SessionRepo } from "../repositories/SessionRepo";
import { UserRepo } from "../repositories/UserRepo";
import { UserStatsRepo } from "../repositories/UserStatsRepo";
import { IAuthentication } from "../shared/model/IAuthentication";
import { IChangeCredentials } from "../shared/model/IChangeCredentials";
import { ChartStatsRouteMeta } from "../shared/model/IChartData";
import { IUser, UserRouteMeta } from "../shared/model/IUser";
import { AuthRole } from "../shared/types/AuthRole";
import { EntityController } from "./core/EntityController";
import { ErrorInterceptor } from "./core/ErrorInterceptor";
import { SessionInterceptor } from "./core/SessionInterceptor";

export class UserController extends EntityController<IUser, UserRepo> {
  constructor() {
    super(UserRouteMeta, new UserRepo(), [AuthRole.ADMIN]);
    this.unlock();
    this.changePassword();
    this.lock();
    this.existsUsername();
    this.findAllShort();
    this.findSession();
    this.login();
    this.logout();
    this.getStatsActiveUsers();
    this.getStatsActiveUsersGroupedByTariff();
    this.getStatsActiveUsersGroupedByGender();
  }

  protected findById(): void {
    this.router.get(
      `${this.routeMeta.path}/:id`,
      SessionInterceptor(async (req, res) => {
        const userId = req.params.id;
        if (!(await req.sessionInfo.isAdminOrYourself(userId))) {
          return this.sendMissingAuthorityError(res);
        }

        const fields = this.getFieldsFromQuery(req.query);
        const entity = await this.repo.findById(userId, fields);
        if (entity) {
          res.status(HttpStatusCode.OK_200).send(entity);
        } else {
          res.status(HttpStatusCode.NOT_FOUND_404).end();
        }
      })
    );
  }

  protected findAll(): void {
    this.router.get(
      this.routeMeta.path,
      SessionInterceptor(
        async (req, res) => {
          const fields = this.getFieldsFromQuery(req.query);
          const query = req.query.query;
          const excludeResigned = req.query.excludeResigned
            ? req.query.excludeResigned === "true"
              ? true
              : false
            : false;

          if (query && typeof query === "string") {
            const users = await this.repo.findAllByQuery(
              query,
              excludeResigned,
              fields
            );
            return res.status(HttpStatusCode.OK_200).send(users);
          }

          const users = await this.repo.findAll(fields);
          return res.status(HttpStatusCode.OK_200).send(users);
        },
        [AuthRole.ADMIN]
      )
    );
  }

  protected update(): void {
    this.router.put(
      `${this.routeMeta.path}/:id`,
      SessionInterceptor(async (req, res) => {
        const user: IUser = req.body;
        if (!(await req.sessionInfo.isAdminOrYourself(user.id))) {
          return this.sendMissingAuthorityError(res);
        }

        const wasUpdated = await this.repo.update(user as IUserSecure);
        res.status(HttpStatusCode.OK_200).send(wasUpdated);
      })
    );
  }

  private changePassword() {
    this.router.post(
      `${this.routeMeta.path}/:id/changePassword`,
      SessionInterceptor(async (req, res) => {
        const userId = req.params.id;
        if (!userId || typeof userId !== "string") {
          return res.status(HttpStatusCode.BAD_REQUEST_400).send();
        }
        if (!(await req.sessionInfo.isAdminOrYourself(userId))) {
          return this.sendMissingAuthorityError(res);
        }
        const changeCredentials: IChangeCredentials = req.body;
        const userRepo = new UserRepo();
        const wasChanged = await userRepo.changePassword(
          userId,
          changeCredentials
        );
        res.status(HttpStatusCode.OK_200).send(wasChanged);
      })
    );
  }

  private existsUsername() {
    this.router.get(
      `${this.routeMeta.path}/exists/:username`,
      SessionInterceptor(async (req, res) => {
        const username = req.params.username;
        if (!username || typeof username !== "string") {
          return res
            .status(HttpStatusCode.BAD_REQUEST_400)
            .send(
              createError(
                "Error while getting username. Username was not provided."
              )
            );
        }

        const userRepo = new UserRepo();
        const contains = await userRepo.existsByUsername(username);
        res.status(HttpStatusCode.OK_200).send(contains);
      })
    );
  }

  private findAllShort() {
    this.router.get(
      `${this.routeMeta.path}/short/all`,
      SessionInterceptor(
        async (req, res) => {
          const role = req.query.role;
          const userRepo = new UserRepo();
          if (role && this.isKeyOf(role, AuthRole)) {
            const usersShort = await userRepo.findAllShortByRole(
              AuthRole[role]
            );
            res.status(HttpStatusCode.OK_200).send(usersShort);
          } else {
            const usersShort = await userRepo.findAllShort();
            res.status(HttpStatusCode.OK_200).send(usersShort);
          }
        },
        [AuthRole.ADMIN]
      )
    );
  }

  private findSession() {
    this.router.get(
      `${this.routeMeta.path}/auth/session`,
      SessionInterceptor(async (req, res) => {
        const entity = await this.repo.findSessionUser(
          req.sessionInfo.session.userId
        );
        if (entity) {
          res.status(HttpStatusCode.OK_200).send(entity);
        } else {
          res.status(HttpStatusCode.NOT_FOUND_404).end();
        }
      })
    );
  }

  private lock() {
    this.router.post(
      `${this.routeMeta.path}/:id/lock`,
      SessionInterceptor(
        async (req, res) => {
          const userId = req.params.id;
          const userRepo = new UserRepo();
          const wasLocked = await userRepo.lock(userId);
          res.status(HttpStatusCode.OK_200).send(wasLocked);
        },
        [AuthRole.ADMIN]
      )
    );
  }

  private login() {
    this.router.post(
      `${this.routeMeta.path}/login`,
      ErrorInterceptor(async (req, res) => {
        const authentication: IAuthentication = req.body;
        const userRepo = new UserRepo();
        const user = await userRepo.findByCredentials(
          authentication.credentials
        );
        if (!user || user.isLocked === true) {
          return res
            .status(HttpStatusCode.NOT_FOUND_404)
            .send(
              createError(
                `Incorrect username or password.`,
                "InvalidCredentialsError"
              )
            );
        }

        // delete old session of the user
        const sessionRepo = new SessionRepo();
        await sessionRepo.deleteAllExcept(req.session.id, user.id);

        (req.session as any).userId = user.id;
        req.session.save(async (err) => {
          if (err) {
            return res
              .status(HttpStatusCode.INTERNAL_SERVER_ERROR_500)
              .send(createError("Error saving session"));
          }
          await sessionRepo.updateUserId(req.session.id, user.id);
          res.status(HttpStatusCode.CREATED_201).send(true);
        });
      })
    );
  }

  private logout() {
    this.router.post(
      `${this.routeMeta.path}/logout`,
      ErrorInterceptor(async (_, res) => {
        res.clearCookie("connect.sid"); // connect.sid is the default cookie name of express-session
        res.status(HttpStatusCode.OK_200).send(true);
      })
    );
  }

  /**
   * Returns the number of active members
   */
  private getStatsActiveUsers() {
    this.router.get(
      `${this.routeMeta.path}${ChartStatsRouteMeta.path}/active`,

      SessionInterceptor(
        async (_, res) => {
          const userStatsRepo = new UserStatsRepo();
          const chartData = await userStatsRepo.getActive();
          res.status(HttpStatusCode.OK_200).send(chartData);
        },
        [AuthRole.ADMIN]
      )
    );
  }

  private getStatsActiveUsersGroupedByTariff() {
    this.router.get(
      `${this.routeMeta.path}${ChartStatsRouteMeta.path}/groupedByTariff`,
      SessionInterceptor(
        async (_, res) => {
          const userStatsRepo = new UserStatsRepo();
          const chartData = await userStatsRepo.groupedByTariff();
          res.status(HttpStatusCode.OK_200).send(chartData);
        },
        [AuthRole.ADMIN]
      )
    );
  }

  private getStatsActiveUsersGroupedByGender() {
    this.router.get(
      `${this.routeMeta.path}${ChartStatsRouteMeta.path}/groupedByGender`,
      SessionInterceptor(
        async (_, res) => {
          const userStatsRepo = new UserStatsRepo();
          const chartData = await userStatsRepo.groupedByGender();
          res.status(HttpStatusCode.OK_200).send(chartData);
        },
        [AuthRole.ADMIN]
      )
    );
  }

  private unlock() {
    this.router.post(
      `${this.routeMeta.path}/:id/unlock`,
      SessionInterceptor(
        async (req, res) => {
          const userId = req.params.id;
          const userRepo = new UserRepo();
          const wasUnlocked = await userRepo.unlock(userId);
          res.status(HttpStatusCode.OK_200).send(wasUnlocked);
        },
        [AuthRole.ADMIN]
      )
    );
  }

  /**
   * Returns if the {@link key} is a key of type of {@link object}.
   */
  private isKeyOf<T extends object>(key: any, object: T): key is keyof T {
    return key in object;
  }
}
