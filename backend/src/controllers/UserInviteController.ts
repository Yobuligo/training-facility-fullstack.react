import { HttpStatusCode } from "../core/api/types/HttpStatusCode";
import { IEntityDetails } from "../core/api/types/IEntityDetails";
import { createError } from "../core/utils/createError";
import { EmailService } from "../email/EmailService";
import { UserInviteRepo } from "../repositories/UserInviteRepo";
import { UserProfileRepo } from "../repositories/UserProfileRepo";
import { NotFoundError } from "../shared/errors/NotFoundError";
import { SendEmailError } from "../shared/errors/SendEmailError";
import { IUserInvite, UserInviteRouteMeta } from "../shared/model/IUserInvite";
import { AuthRole } from "../shared/types/AuthRole";
import { EntityController } from "./core/EntityController";
import { ErrorInterceptor } from "./core/ErrorInterceptor";
import { SessionInterceptor } from "./core/SessionInterceptor";

export class UserInviteController extends EntityController<
  IUserInvite,
  UserInviteRepo
> {
  constructor() {
    super(UserInviteRouteMeta, new UserInviteRepo(), [AuthRole.ADMIN]);
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
          const userProfileRepo = new UserProfileRepo();
          const userProfile = await userProfileRepo.findByUserId(
            createdUserInvite.userId,
            ["email"]
          );
          if (!userProfile) {
            throw new NotFoundError("NotFoundError");
          }

          // send invite
          try {
            const emailService = new EmailService();
            await emailService.sendInvite(
              userProfile.email,
              createdUserInvite.id
            );
            res.status(HttpStatusCode.CREATED_201).send(createdUserInvite);
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

  private verify() {
    this.router.get(
      `${this.routeMeta.path}/:id/verify`,
      ErrorInterceptor(async (req, res) => {
        const userInviteId = req.params.id;
        const userInviteRepo = new UserInviteRepo();
        const userInvite = await userInviteRepo.verify(userInviteId);
        res.status(HttpStatusCode.OK_200).send(userInvite);
      })
    );
  }
}
