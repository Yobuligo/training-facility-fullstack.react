import { createError } from "../core/utils/createError";
import { SessionRepo } from "../repositories/SessionRepo";
import { UserRepo } from "../repositories/UserRepo";
import { IAuthentication } from "../shared/model/IAuthentication";
import { ICredentials } from "../shared/model/ICredentials";
import { ISession } from "../shared/model/ISession";
import { IUser, UserRouteMeta } from "../shared/model/IUser";
import { EntityController } from "./core/EntityController";
import { ErrorInterceptor } from "./core/ErrorInterceptor";
import { SessionInterceptor } from "./core/SessionInterceptor";

export class UserController extends EntityController<IUser, UserRepo> {
  constructor() {
    super(UserRouteMeta, new UserRepo());
    this.activate();
    this.deactivate();
    this.existsUsername();
    this.findAllShort();
    this.login();
    this.logout();
    this.register();
  }

  private activate() {
    this.router.post(
      `${this.routeMeta.path}/:id/activate`,
      SessionInterceptor(async (req, res) => {
        const userId = req.params.id;
        const userRepo = new UserRepo();
        const wasActivated = await userRepo.activate(userId);
        res.status(200).send(wasActivated);
      })
    );
  }

  private deactivate() {
    this.router.post(
      `${this.routeMeta.path}/:id/deactivate`,
      SessionInterceptor(async (req, res) => {
        const userId = req.params.id;
        const userRepo = new UserRepo();
        const wasDeactivated = await userRepo.deactivate(userId);
        res.status(200).send(wasDeactivated);
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
            .status(400)
            .send(
              createError(
                "Error while getting username. Username was not provided."
              )
            );
        }

        const userRepo = new UserRepo();
        const contains = await userRepo.existsByUsername(username);
        res.status(200).send(contains);
      })
    );
  }

  private findAllShort() {
    this.router.get(
      `${this.routeMeta.path}/short/all`,
      SessionInterceptor(async (_, res) => {
        const userRepo = new UserRepo();
        const usersShort = await userRepo.findAllShort();
        res.status(200).send(usersShort);
      })
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
            .status(404)
            .send(createError(`Incorrect username or password.`));
        }

        if (user.isDeactivated === true) {
          return res.status(403).send(createError(`User is deactivated.`));
        }

        const sessionRepo = new SessionRepo();
        const session = await sessionRepo.createUserSession(user);
        res.status(201).send(session);
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
        res.status(200).send(success);
      })
    );
  }

  private register() {
    this.router.post(
      `${this.routeMeta.path}/register`,
      ErrorInterceptor(async (req, res) => {
        const credentials: ICredentials = req.body;

        const userRepo = new UserRepo();
        const user = await userRepo.findByUsername(credentials.username);
        if (user) {
          return res.status(409).send(createError(`User already exists.`));
        }
        await userRepo.createUser(credentials);
        return res.status(201).send(true);
      })
    );
  }
}
