import { AppConfig } from "../AppConfig";
import { SendEmailError } from "../shared/errors/SendEmailError";
import { smtp } from "./smtp";

export class EmailService {
  async sendInvite(recipient: string, userInviteId: string) {
    // create invite link
    const linkInvite = `${AppConfig.clientHost}/user-invite/${userInviteId}`;

    try {
      await smtp.sendMail({
        from: AppConfig.smtpSender,
        to: recipient,
        subject: "Einladung zu Yeoljeong",
        text: `Du wurdest eingeladen. Melde dich bitte unter folgendem Link an ${linkInvite}`,
      });
    } catch (error) {
      let message = "";
      if (error instanceof Error) {
        message = error.message;
      }
      throw new SendEmailError(message);
    }
  }
}
