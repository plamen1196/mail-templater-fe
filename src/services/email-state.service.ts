import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { Recipient } from 'src/models/recipient';
import { EmailTemplate } from 'src/models/templates/email-template';

@Injectable({
  providedIn: 'root'
})
export class EmailStateService {

  private emailTemplate$ = new BehaviorSubject<EmailTemplate | null>(null);
  private emailRecipients$ = new BehaviorSubject<Array<Recipient>>([]);

  constructor() { }

  getEmailTemplate(): Observable<EmailTemplate | null> {
    return this.emailTemplate$.asObservable();
  }

  setEmailTemplate(emailTemplate: EmailTemplate): void {
    this.emailTemplate$.next(emailTemplate);
  }

  getEmailRecipients(): Observable<Array<Recipient>> {
    return this.emailRecipients$.asObservable();
  }

  setEmailRecipients(recipients: Array<Recipient>): void {
    this.emailRecipients$.next(recipients);
  }
}
