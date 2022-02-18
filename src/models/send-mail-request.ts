import { EmailTemplate } from "./templates/email-template";
import { RecipientRequest } from "./recipient-request";

export class SendMailRequest extends EmailTemplate {
    recipients: Array<RecipientRequest>;
    html: boolean;
}
