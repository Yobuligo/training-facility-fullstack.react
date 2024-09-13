import { AppConfig } from "../AppConfig";
import { HttpStatusCode } from "../core/api/types/HttpStatusCode";
import { checkNotNull } from "../core/utils/checkNotNull";
import { smtp } from "../email/smtp";
import { Controller } from "./core/Controller";

export class DemoController extends Controller {
  constructor() {
    super();
    this.sendEmail();
  }

  private sendEmail() {
    this.router.get("/email/send", (req, res) => {
      smtp.sendMail(
        {
          from: checkNotNull(AppConfig.smtpSender),
          to: "hoffmannpeter82@gmail.com",
          subject: "Test",
          text: "Hello World",
        },
        (error, info) => {
          if (error) {
            res.status(HttpStatusCode.BAD_REQUEST_400).send(true);
          } else {
            res.status(HttpStatusCode.OK_200).send(true);
          }
        }
      );
    });
  }
}
