import { AppConfig } from "../AppConfig";
import { DateTime } from "../core/services/date/DateTime";
import { error } from "../core/utils/error";
import { SystemConfigRepo } from "../repositories/SystemConfigRepo";
import { SendEmailError } from "../shared/errors/SendEmailError";
import { IEventInstance } from "../shared/model/IEventInstance";
import { IUserTrialTraining } from "../shared/model/IUserTrialTraining";
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
    const linkLogin = `${AppConfig.clientAppUrl}/login`;

    const systemConfigRepo = new SystemConfigRepo();
    const systemConfig = await systemConfigRepo.findFirst();

    try {
      await smtp.sendMail({
        from: AppConfig.smtpSender,
        to: recipientEmail,
        subject: "Willkommen im Taekwon-Do Mitgliederbereich!",
        html: `
          <p>Hallo ${firstname},</p>
      
          <p>
            herzlich willkommen im Mitgliederbereich unseres Taekwon-Do-Portals! Als Mitglied hast du Zugriff auf alle wichtigen Informationen rund um dein Training, dein Profil, deine Fortschritte und unsere WhatsApp-Gruppen. <br />
            Schließe bitte zunächst deine Anmeldung ab und tritt anschließend den für dich relevanten WhatsApp-Gruppen bei, um keine wichtigen Neuigkeiten zu verpassen.
          </p>
          
          <h3 style="margin-bottom: 0px;">Anmeldung abschließen</h3>
          Um dir den Einstieg so einfach wie möglich zu machen, findest du hier die ersten Schritte:
      
          <ol>
            <li><strong>Anmeldung abschließen:</strong> Vor deinem ersten Login musst du dein Passwort vergeben. Bitte wähle ein sicheres Passwort, um deinen Account bestmöglich zu schützen.</li>
            <li><strong>Einloggen:</strong> Mit deinem Benutzernamen <strong>${username}</strong> und dem gesetzten Passwort kannst du dich nun einloggen.</li>
            <li><strong>Trainingsübersicht und Anmeldung:</strong> Jetzt kannst du im Mitgliederbereich die aktuellen Trainingszeiten einsehen und dich direkt für deine Trainings anmelden.</li>
            <li><strong>Profil verwalten:</strong> In deinem Profil kannst du persönliche Informationen aktualisieren und stets auf dem neuesten Stand halten. Darüber hinaus hast du Zugriff auf wichtige Informationen zu deinen Prüfungen.</li>
          </ol>
      
          <p>
            Um deine Anmeldung abzuschließen, klicke bitte auf folgenden Link: <a href="${linkInvite}">Anmelde-Link</a><br />
            Nach Abschluss der Registrierung kannst du dich mit deinem Benutzername <strong>${username}</strong> im Portal über diesen Link jederzeit anmelden: <a href="${linkLogin}">Portal-Link</a>
          </p>

          <h3 style="margin-bottom: 0px;">WhatsApp-Gruppen beitreten</h3>
          Wir nutzen WhatsApp, um dich immer auf dem Laufenden zu halten und uns auszutauschen. Tritt einfach den passenden Gruppen bei:

          <ol>
            <li><strong>Ankündigungen</strong>: Für wichtige Infos und Neuigkeiten: <a href="${
              systemConfig.whatsAppURLNews
            }">Ankündigungen-Gruppe-Link</a></li>
            <li><strong>Kindergruppe</strong>: Speziell für alle Eltern und Kinder: <a href="${
              systemConfig.whatsAppURLKids
            }">Kindergruppe-Link</a></li>
            <li><strong>Austausch</strong>: Für den offenen Austausch und allgemeine Themen: <a href="${
              systemConfig.whatsAppURLCommunity
            }">Austausch-Gruppe-Link</a></li>
          </ol>
      
          <p>Bei Fragen oder Problemen stehen wir dir natürlich gerne zur Verfügung.</p>
      
          ${this.createSignature()}
        `,
      });
    } catch (error) {
      this.handleError(error);
    }
  }

  async bookTrialTraining(
    userTrialTraining: IUserTrialTraining,
    eventInstance: IEventInstance
  ) {
    const cancelLink = `${AppConfig.clientAppUrl}/cancel-trial-training/${userTrialTraining.id}`;
    const startTime = this.toDeTimezone(eventInstance.from);

    try {
      await smtp.sendMail({
        from: AppConfig.smtpSender,
        to: userTrialTraining.email,
        subject: "Anmeldung zum Taekwon-Do Probetraining",
        html: `
          <p>Hallo ${userTrialTraining.firstname},</p>

          <p>vielen Dank für dein Interesse an unserem Taekwon-Do Probetraining! Hier sind alle wichtigen Informationen, die du für das Training benötigst:</p>

          <ol>
            <li><strong>Wann:</strong> Das Training findet am ${DateTime.format(
              startTime,
              "dd.MM.yyyy"
            )} um ${DateTime.format(
          startTime,
          "hh:mm"
        )} statt. Falls du es schaffst, sei bitte 10 - 15 min vor Trainingsbeginn da, dann kannst du dich noch in Ruhe umziehen und wir haben noch kurz Zeit uns vorzustellen. </li>
            <li><strong>Wo:</strong> Landstraße 108, 69198 Schriesheim</li>
            <li><strong>Was solltest du mitbringen:</strong> Wir trainieren barfuß, daher benötigst du nur eine lange Sporthose und ein T-Shirt. Weitere Ausrüstung ist für das Probetraining nicht notwendig.</li>
          </ol>

          <p>Falls du doch nicht am Training teilnehmen kannst, melde dich bitte über diesen Link vom Training ab: <a href="${cancelLink}">Stornierungs-Link</a></p>

          <p>Wir freuen uns, dich beim Training kennenzulernen!</p>

          ${this.createSignature()}
          `,
      });
    } catch (error) {}
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
    return `
        <p>Liebe Grüße,<br>Beatriz, Frank, Peter & Sonja</p>
        <p>
          <strong>Yeoljeong Taekwon-Do</strong><br>
          Bascon-Wolf, Burkart, Hoffmann und Steinhagen TaeXit GbR<br>
          Landstraße 108 | 69198 Schriesheim | Germany<br>
          E-Mail: info@yeoljeong-taekwondo.de<br>
          http://www.yeoljeong-taekwondo.de/<br>
        </p>`;
  }

  /**
   * Converts the given {@link date} to the German timezone
   */
  private toDeTimezone(date: Date): Date {
    const formatter = new Intl.DateTimeFormat("de-DE", {
      timeZone: "Europe/Berlin",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    const parts = formatter.formatToParts(date);
    const dateParts = {
      year: parts.find((p) => p.type === "year")?.value ?? error(),
      month: parts.find((p) => p.type === "month")?.value,
      day: parts.find((p) => p.type === "day")?.value,
      hour: parts.find((p) => p.type === "hour")?.value,
      minute: parts.find((p) => p.type === "minute")?.value,
      second: parts.find((p) => p.type === "second")?.value,
    };

    return new Date(
      `${dateParts.year}-${dateParts.month}-${dateParts.day}T${dateParts.hour}:${dateParts.minute}:${dateParts.second}`
    );
  }
}
