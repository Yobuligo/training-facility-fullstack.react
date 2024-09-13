import { AppConfig } from "../AppConfig";
import { smtp } from "./smtp";

export class EmailService {
  sendInvite(recipient: string, userInviteId: string) {
    // create invite link
    const linkInvite = `${AppConfig.clientHost}/user-invite/${userInviteId}`;

    smtp.sendMail(
      {
        from: AppConfig.smtpSender,
        to: recipient,
        subject: "Einladung zu Yeoljeong",
        text: `Du wurdest eingeladen. Melde dich bitte unter folgendem Link an ${linkInvite}`,
      },
      (error) => {
        // todo
      }
    );
  }
}
