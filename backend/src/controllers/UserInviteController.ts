import { HttpStatusCode } from "../core/api/types/HttpStatusCode";
import { IEntityDetails } from "../core/api/types/IEntityDetails";
import { createError } from "../core/utils/createError";
import { EmailService } from "../email/EmailService";
import { UserInviteRepo } from "../repositories/UserInviteRepo";
import { UserRepo } from "../repositories/UserRepo";
import { NotFoundError } from "../shared/errors/NotFoundError";
import { SendEmailError } from "../shared/errors/SendEmailError";
import { IUserInvite, UserInviteRouteMeta } from "../shared/model/IUserInvite";
import { IUserInviteRequestPasswordChange } from "../shared/model/IUserInviteRequestPasswordChange";
import { AuthRole } from "../shared/types/AuthRole";
import { UserInviteType } from "../shared/types/UserInviteType";
import { EntityController } from "./core/EntityController";
import { SessionInterceptor } from "./core/SessionInterceptor";
import { TokenInterceptor } from "./core/TokenInterceptor";

export class UserInviteController extends EntityController<
  IUserInvite,
  UserInviteRepo
> {
  constructor() {
    super(UserInviteRouteMeta, new UserInviteRepo(), [AuthRole.ADMIN]);
    this.changePassword();
    this.verify();
  }

  protected insert(): void {
    this.router.post(
      this.routeMeta.path,
      SessionInterceptor(
        async (req, res) => {
          // create user invite
          const userInvite: IEntityDetails<IUserInvite> = req.body;
          const fields = this.getFieldsFromQuery(req.query);
          const createdUserInvite = await this.repo.insert(userInvite, fields);

          // find user email
          const userRepo = new UserRepo();
          const userShort = await userRepo.findByIdShort(
            createdUserInvite.userId
          );
          if (!userShort) {
            throw new NotFoundError("NotFoundError");
          }

          // send invite
          try {
            const emailService = new EmailService();

            if (userInvite.type === UserInviteType.REGISTER) {
              await emailService.sendInvite(
                userShort.email,
                createdUserInvite.id,
                userShort.firstname,
                userShort.username
              );
              res.status(HttpStatusCode.CREATED_201).send(createdUserInvite);
            } else {
              await emailService.resetPassword(
                userShort.email,
                createdUserInvite.id,
                userShort.firstname
              );
              res.status(HttpStatusCode.CREATED_201).send(createdUserInvite);
            }
          } catch (error) {
            res
              .status(HttpStatusCode.INTERNAL_SERVER_ERROR_500)
              .send(
                createError(
                  `Error while sending email. ${
                    error instanceof SendEmailError ? error.message : ""
                  }`,
                  "SendEmailError"
                )
              );
          }
        },
        [AuthRole.ADMIN]
      )
    );
  }

  private changePassword() {
    this.router.post(
      `${this.routeMeta.path}/:id/change-password`,
      TokenInterceptor(async (req, res) => {
        // first verify userInvite
        const userInviteId = req.params.id;
        const userInviteRepo = new UserInviteRepo();
        await userInviteRepo.verify(userInviteId);

        // change password and delete user invite
        const userInviteRequestPasswordChange: IUserInviteRequestPasswordChange =
          req.body;
        const userRepo = new UserRepo();
        const wasChanged = await userRepo.setPassword(
          userInviteRequestPasswordChange.userId,
          userInviteRequestPasswordChange.newPassword
        );

        await userInviteRepo.deleteById(userInviteId);
        res.status(HttpStatusCode.OK_200).send(wasChanged);
      })
    );
  }

  private verify() {
    this.router.get(
      `${this.routeMeta.path}/:id/verify`,
      TokenInterceptor(async (req, res) => {
        const userInviteId = req.params.id;
        const userInviteRepo = new UserInviteRepo();
        const userInvite = await userInviteRepo.verify(userInviteId);
        res.status(HttpStatusCode.OK_200).send(userInvite);
      })
    );
  }
}
