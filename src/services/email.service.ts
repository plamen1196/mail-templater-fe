import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { EmailTemplaterApi } from 'src/api/email-templater-api';
import { SentEmailResource } from 'src/models/sent-email-resource';
import { EmailTemplate } from 'src/models/templates/email-template';
import { PreviewRecipientEmail } from 'src/models/preview-recipient-email';
import { Recipient } from 'src/models/recipient';
import { RecipientRequest } from 'src/models/recipient-request';
import { SendMailRequest } from 'src/models/send-mail-request';
import { SmtpServerResource } from 'src/models/smtp-server-resource';
import { CredentialsRequest } from 'src/models/credentials-resource';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private httpClient: HttpClient) { }

  getSmtpServers(): Observable<Array<SmtpServerResource>> {
    return this.httpClient.get<Array<SmtpServerResource>>(EmailTemplaterApi.GET_SMTP_SERVERS);
  }

  getHistory(
    subject?: string,
    senderEmail?: string,
    recipientEmail?: string,
    sentSuccessfully?: boolean,
    confirmation?: number,
    startDate?: Date,
    endDate?: Date): Observable<Array<SentEmailResource>> {
      const headers = new HttpHeaders().set('content-type', 'application/json');
      let params = this.buildHistoryDateParams(startDate, endDate);

      if (subject) {
        params = params.append('subject', subject);
      }

      if (senderEmail) {
        params = params.append('senderEmail', senderEmail);
      }

      if (recipientEmail) {
        params = params.append('recipientEmail', recipientEmail);
      }

      /* We must allow the value "false" */
      if (sentSuccessfully != null && sentSuccessfully != undefined) {
        params = params.append('sentSuccessfully', sentSuccessfully);
      }

      /* We must allow the value "0" */
      if (confirmation != null && confirmation != undefined) {
        params = params.append('confirmation', confirmation);
      }
      
      return this.httpClient.get<Array<SentEmailResource>>(EmailTemplaterApi.HISTORY, { headers, params });
  }

  sendEmails(
    emailTemplate: EmailTemplate,
    recipients: Array<Recipient>,
    isHtml: boolean,
    credentials?: CredentialsRequest): Observable<number> {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    const payload = this.buildSendMailRequest(emailTemplate, recipients, isHtml, credentials);

    return this.httpClient.post<number>(EmailTemplaterApi.SEND_MAILS, payload, { headers });
  }

  previewEmails(emailTemplate: EmailTemplate, recipients: Array<Recipient>): Observable<Array<PreviewRecipientEmail>> {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    const payload = this.buildSendMailRequest(emailTemplate, recipients, false);

    return this.httpClient.post<Array<PreviewRecipientEmail>>(EmailTemplaterApi.PREVIEW_MAILS, payload, { headers });
  }

  private buildSendMailRequest(emailTemplate: EmailTemplate, recipients: Array<Recipient>, isHtml: boolean, credentials?: CredentialsRequest): SendMailRequest {
    const sendMailRequest = new SendMailRequest();
    sendMailRequest.title = emailTemplate.title;
    sendMailRequest.message = emailTemplate.message;
    /* 
     * It is possible that the template does not have placeholders (ordinary email).
     * In this case we need to pass empty array, due to the @NotNull constraint by the backend.
    */
    sendMailRequest.placeholders = emailTemplate.placeholders ? emailTemplate.placeholders : [];
    sendMailRequest.recipients = this.buildRecipientRequests(recipients);
    sendMailRequest.isHtml = isHtml;
    
    if (credentials?.username && credentials?.password && credentials?.smtpServerName) {
     sendMailRequest.credentials = credentials; 
    }

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

    /* If the template does not have placeholders, then the recipients might not have as well. */
    if (recipient.placeholders) {
      recipient.placeholders.forEach((val: string, key: string) => {
        convertedMap[key] = val;
      });
    }

    const recipientRequest = new RecipientRequest();
    recipientRequest.email = recipient.email;
    recipientRequest.placeholders = convertedMap;

    return recipientRequest;
  }

  private buildHistoryDateParams(startDate?: Date, endDate?: Date): HttpParams {
    let params = new HttpParams();

    if (startDate && endDate) {
      params = new HttpParams().appendAll(
        { 'startDate': startDate.toISOString(), 'endDate': endDate.toISOString() });
    }

    if (startDate && !endDate) {
      params = new HttpParams().append('startDate', startDate.toISOString());
    }

    if (!startDate && endDate) {
      params = new HttpParams().append('endDate', endDate.toISOString());
    }

    return params;
  }
}
