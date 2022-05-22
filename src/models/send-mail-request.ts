import { EmailTemplate } from "./templates/email-template";
import { RecipientRequest } from "./recipient-request";
import { CredentialsRequest } from "./credentials-resource";

export class SendMailRequest extends EmailTemplate {
    recipients: Array<RecipientRequest>;
    isHtml: boolean;
    credentials?: CredentialsRequest;
}
