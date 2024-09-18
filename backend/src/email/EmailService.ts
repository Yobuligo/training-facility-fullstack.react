import { AppConfig } from "../AppConfig";
import { SendEmailError } from "../shared/errors/SendEmailError";
import { smtp } from "./smtp";

export class EmailService {
  async resetPassword(
    recipientEmail: string,
    userInviteId: string,
    firstname: string
  ) {
    const linkInvite = this.createInviteLink(userInviteId);

    try {
      await smtp.sendMail({
        from: AppConfig.smtpSender,
        to: recipientEmail,
        subject:
          "Zurücksetzen deines Passwortes für den Taekwon-Do Mitgliederbereich",
        html: `
          <p>Hallo ${firstname},</p>

          <p>wir haben eine Anfrage zum Zurücksetzen deines Passworts für den Mitgliederbereich unseres Taekwon-Do-Portals erhalten. Um ein neues Passwort festzulegen, klicke bitte auf den untenstehenden Link:</p>

          <p><a href="${linkInvite}">Passwort zurücksetzen</a></p>

          <p>Falls du keine Passwortänderung angefordert hast, kannst du diese E-Mail einfach ignorieren – dein Passwort bleibt unverändert.</p>

          <p>Bitte beachte, dass der Link aus Sicherheitsgründen nur für eine begrenzte Zeit gültig ist.</p>

          ${this.createSignature()}
        `,
      });
    } catch (error) {
      this.handleError(error);
    }
  }

  async sendInvite(
    recipientEmail: string,
    userInviteId: string,
    firstname: string,
    username: string
  ) {
    const linkInvite = this.createInviteLink(userInviteId);

    try {
      await smtp.sendMail({
        from: AppConfig.smtpSender,
        to: recipientEmail,
        subject: "Willkommen im Taekwon-Do Mitgliederbereich!",
        html: `
          <p>Hallo ${firstname},</p>
      
          <p>herzlich willkommen im Mitgliederbereich unseres Taekwon-Do-Portals! Als Mitglied hast du Zugriff auf alle wichtigen Informationen rund um dein Training, dein Profil und deine Fortschritte. Um dir den Einstieg so einfach wie möglich zu machen, findest du hier die ersten Schritte:</p>
      
          <ol>
            <li><strong>Anmeldung abschließen:</strong> Vor deinem ersten Login musst du dein Passwort vergeben. Bitte wähle ein sicheres Passwort, um deinen Account bestmöglich zu schützen.</li>
            <li><strong>Einloggen:</strong> Mit deinem Benutzernamen <strong>${username}</strong> und dem gesetzten Passwort kannst du dich nun einloggen.</li>
            <li><strong>Trainingsübersicht und Anmeldung:</strong> Jetzt kannst du im Mitgliederbereich die aktuellen Trainingszeiten einsehen und dich direkt für deine Trainings anmelden.</li>
            <li><strong>Profil verwalten:</strong> In deinem Profil kannst du persönliche Informationen aktualisieren und stets auf dem neuesten Stand halten. Darüber hinaus hast du Zugriff auf wichtige Informationen zu deinen Prüfungen.</li>
          </ol>
      
          <p>Um deine Anmeldung abzuschließen, klicke bitte auf folgenden Link: <a href="${linkInvite}">Anmelde-Link</a></p>
      
          <p>Nach Abschluss der Registrierung kannst du dich mit deinem Benutzername <strong>${username}</strong> im Portal über diesen Link jederzeit anmelden: <a href="${
          AppConfig.clientAppUrl
        }">Portal-Link</a></p>
      
          <p>Bei Fragen oder Problemen stehen wir dir natürlich gerne zur Verfügung.</p>
      
          ${this.createSignature()}
        `,
      });
    } catch (error) {
      this.handleError(error);
    }
  }

  private createInviteLink(userInviteId: string): string {
    return `${AppConfig.clientAppUrl}/user-invite/${userInviteId}`;
  }

  private handleError(error: any) {
    let message = "";
    if (error instanceof Error) {
      message = error.message;
    }
    throw new SendEmailError(message);
  }

  private createSignature() {
    return `<p>Liebe Grüße,<br>Beatriz, Frank, Peter & Sonja</p>`;
  }
}
