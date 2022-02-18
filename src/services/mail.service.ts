import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmailTemplaterApi } from 'src/api/email-templater-api';
import { EmailRecord } from 'src/models/email-record';
import { EmailTemplate } from 'src/models/templates/email-template';
import { PreviewRecipientEmail } from 'src/models/preview-recipient-email';
import { Recipient } from 'src/models/recipient';
import { RecipientRequest } from 'src/models/recipient-request';
import { SendMailRequest } from 'src/models/send-mail-request';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private httpClient: HttpClient) { }

  getHistory(): Observable<Array<EmailRecord>> {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.httpClient.get<Array<EmailRecord>>(EmailTemplaterApi.HISTORY, { headers });
  }

  sendMail(emailTemplate: EmailTemplate, recipients: Array<Recipient>, html: boolean): Observable<number> {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    const payload = this.buildSendMailRequest(emailTemplate, recipients, html);

    return this.httpClient.post<number>(EmailTemplaterApi.SEND_MAILS, payload, { headers });
  }

  previewMail(emailTemplate: EmailTemplate, recipients: Array<Recipient>): Observable<Array<PreviewRecipientEmail>> {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    const payload = this.buildSendMailRequest(emailTemplate, recipients, false);

    return this.httpClient.post<Array<PreviewRecipientEmail>>(EmailTemplaterApi.PREVIEW_MAILS, payload, { headers });
  }

  private buildSendMailRequest(emailTemplate: EmailTemplate, recipients: Array<Recipient>, html: boolean): SendMailRequest {
    const sendMailRequest = new SendMailRequest();
    sendMailRequest.title = emailTemplate.title;
    sendMailRequest.message = emailTemplate.message;
    sendMailRequest.placeholders = emailTemplate.placeholders;
    sendMailRequest.recipients = this.buildRecipientRequests(recipients);
    sendMailRequest.html = html;

    console.log(sendMailRequest);

    return sendMailRequest;
  }

  private buildRecipientRequests(recipients: Array<Recipient>): Array<RecipientRequest> {
    return recipients.map((recipient: Recipient) => this.buildRecipientRequest(recipient));
  }

  private buildRecipientRequest(recipient: Recipient): RecipientRequest {
    // if (recipient == null) {
    //   return null;
    // }

    const convertedMap: any = {};
    recipient.placeholders.forEach((val: string, key: string) => {
      convertedMap[key] = val;
    });

    const recipientRequest = new RecipientRequest();
    recipientRequest.email = recipient.email;
    recipientRequest.placeholders = convertedMap;

    return recipientRequest;
  }
}
