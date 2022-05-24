import { RecipientRequest } from "./recipient-request";
import { EmailTemplate } from "./templates/email-template";

export class PreviewEmailRequest extends EmailTemplate {
    recipients: Array<RecipientRequest>;
    isHtml: boolean;
}
