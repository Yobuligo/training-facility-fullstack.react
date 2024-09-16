import { AppConfig } from "../AppConfig";
import { SendEmailError } from "../shared/errors/SendEmailError";
import { smtp } from "./smtp";

export class EmailService {
  async sendInvite(recipient: string, userInviteId: string, firstname: string) {
    // create invite link
    const linkInvite = `${AppConfig.clientHost}/user-invite/${userInviteId}`;

    try {
      await smtp.sendMail({
        from: AppConfig.smtpSender,
        to: recipient,
        subject: "Willkommen im Taekwon-Do Mitgliederbereich!",
        html: `
        <p>Hallo ${firstname},</p>
    
        <p>herzlich willkommen im Mitgliederbereich unseres Taekwon-Do-Portals! Als Mitglied hast du Zugriff auf alle wichtigen Informationen rund um dein Training, dein Profil und deine Fortschritte. Um dir den Einstieg so einfach wie möglich zu machen, findest du hier die ersten Schritte:</p>
    
        <ol>
          <li><strong>Passwort festlegen:</strong> Beim ersten Login wirst du aufgefordert, dein Passwort zu ändern. Bitte wähle ein sicheres Passwort, um deinen Account bestmöglich zu schützen.</li>
          <li><strong>Trainingsübersicht und Anmeldung:</strong> Nach der Passwortänderung kannst du im Mitgliederbereich die aktuellen Trainingszeiten einsehen und dich direkt für deine bevorzugten Einheiten anmelden.</li>
          <li><strong>Profil verwalten:</strong> In deinem Profil kannst du persönliche Informationen aktualisieren und stets auf dem neuesten Stand halten. Darüber hinaus hast du Zugriff auf wichtige Informationen zu deinen Prüfungen und Trainingsfortschritten.</li>
        </ol>
    
        <p>Um deine Anmeldung abzuschließen, klicke bitte auf folgenden Link: <a href="${linkInvite}">Anmelde-Link</a></p>
    
        <p>Nach Abschluss der Registrierung ist das Portal über diesen Link jederzeit erreichbar: <a href="${AppConfig.clientHost}">Portal-Link</a></p>
    
        <p>Bei Fragen oder Problemen stehen wir dir natürlich gerne zur Verfügung.</p>
    
        <p>Liebe Grüße,<br>Beatriz, Frank, Peter & Sonja</p>
      `,
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
