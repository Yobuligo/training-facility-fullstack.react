import { HttpStatusCode } from "../core/api/types/HttpStatusCode";
import { createError } from "../core/utils/createError";
import { IUserSecure } from "../model/types/IUserSecure";
import { SessionRepo } from "../repositories/SessionRepo";
import { UserRepo } from "../repositories/UserRepo";
import { IAuthentication } from "../shared/model/IAuthentication";
import { IChangeCredentials } from "../shared/model/IChangeCredentials";
import { ISession } from "../shared/model/ISession";
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
    this.login();
    this.logout();
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
          if (query && typeof query === "string") {
            const users = await this.repo.findAllByQuery(query, fields);
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
        async (_, res) => {
          const userRepo = new UserRepo();
          const usersShort = await userRepo.findAllShort();
          res.status(HttpStatusCode.OK_200).send(usersShort);
        },
        [AuthRole.ADMIN]
      )
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

        const sessionRepo = new SessionRepo();
        const session = await sessionRepo.createUserSession(
          user,
          req.session.id
        );
        res.status(HttpStatusCode.CREATED_201).send(session);
      })
    );
  }

  private logout() {
    this.router.post(
      `${this.routeMeta.path}/logout`,
      ErrorInterceptor(async (req, res) => {
        const session: ISession = req.body;
        const sessionRepo = new SessionRepo();
        const success = await sessionRepo.deleteSession(session);
        res.clearCookie("connect.sid"); // connect.sid is the default cookie name of express-session
        res.status(HttpStatusCode.OK_200).send(success);
      })
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
}
