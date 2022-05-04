import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { Recipient } from 'src/models/recipient';

@Injectable({
  providedIn: 'root'
})
export class EmailStateService {

  private recipients = new BehaviorSubject<Array<Recipient>>([]);

  constructor() { }

  getRecipients(): Observable<Array<Recipient>> {
    return this.recipients.asObservable();
  }

  setRecipients(recipients: Array<Recipient>): void {
    this.recipients.next(recipients);
  }
}
