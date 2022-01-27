import { EmailTemplate } from "./email-template";
import { RecipientRequest } from "./recipient-request";

export class SendMailRequest extends EmailTemplate {
    recipients: Array<RecipientRequest>;
    html: boolean;
}
