import { HttpStatusCode } from "../core/api/types/HttpStatusCode";
import { createError } from "../core/utils/createError";
import { SessionRepo } from "../repositories/SessionRepo";
import { UserRepo } from "../repositories/UserRepo";
import { IAuthentication } from "../shared/model/IAuthentication";
import { ISession } from "../shared/model/ISession";
import { IUser, UserRouteMeta } from "../shared/model/IUser";
import { AuthRole } from "../shared/types/AuthRole";
import { EntityController } from "./core/EntityController";
import { ErrorInterceptor } from "./core/ErrorInterceptor";
import { SessionInterceptor } from "./core/SessionInterceptor";

export class UserController extends EntityController<IUser, UserRepo> {
  constructor() {
    super(UserRouteMeta, new UserRepo(), [AuthRole.ADMIN]);
    this.activate();
    this.deactivate();
    this.existsUsername();
    this.findAllShort();
    this.login();
    this.logout();
  }

  private activate() {
    this.router.post(
      `${this.routeMeta.path}/:id/activate`,
      SessionInterceptor(
        async (req, res) => {
          const userId = req.params.id;
          const userRepo = new UserRepo();
          const wasActivated = await userRepo.activate(userId);
          res.status(HttpStatusCode.OK_200).send(wasActivated);
        },
        [AuthRole.ADMIN]
      )
    );
  }

  private deactivate() {
    this.router.post(
      `${this.routeMeta.path}/:id/deactivate`,
      SessionInterceptor(
        async (req, res) => {
          const userId = req.params.id;
          const userRepo = new UserRepo();
          const wasDeactivated = await userRepo.deactivate(userId);
          res.status(HttpStatusCode.OK_200).send(wasDeactivated);
        },
        [AuthRole.ADMIN]
      )
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

  private login() {
    this.router.post(
      `${this.routeMeta.path}/login`,
      ErrorInterceptor(async (req, res) => {
        const authentication: IAuthentication = req.body;
        const userRepo = new UserRepo();
        const user = await userRepo.findByCredentials(
          authentication.credentials
        );
        if (!user) {
          return res
            .status(HttpStatusCode.NOT_FOUND_404)
            .send(createError(`Incorrect username or password.`));
        }

        if (user.isDeactivated === true) {
          return res
            .status(HttpStatusCode.FORBIDDEN_403)
            .send(createError(`User is deactivated.`));
        }

        const sessionRepo = new SessionRepo();
        const session = await sessionRepo.createUserSession(user);
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
        res.status(HttpStatusCode.OK_200).send(success);
      })
    );
  }
}
