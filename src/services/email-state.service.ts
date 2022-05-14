import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';

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

  addEmailRecipients(newRecipients: Array<Recipient>): void {
    this.getEmailRecipients()
      .pipe(take(1))
      .subscribe((recipients: Array<Recipient>) => {
        const updatedRecipients = recipients.concat(newRecipients);
        console.log(updatedRecipients);
        this.setEmailRecipients(updatedRecipients);
      });
  }

  removeEmailRecipient(recipient: Recipient): void {
    this.getEmailRecipients()
      .pipe(take(1))
      .subscribe((recipients: Array<Recipient>) => {
        const indexOfElement = recipients.indexOf(recipient);

        if (indexOfElement >= 0) {
          recipients.splice(indexOfElement, 1);
          this.setEmailRecipients(recipients);
        } else {
          console.error(`Cannot find recipient with email ${recipient.email} to remove it from email list.`);
        }
      });
  }
}
