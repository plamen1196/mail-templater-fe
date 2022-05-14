import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Recipient } from 'src/models/recipient';

@Component({
  selector: 'app-edit-email-recipient',
  templateUrl: './edit-email-recipient.component.html',
  styleUrls: ['./edit-email-recipient.component.scss']
})
export class EditEmailRecipientComponent {
  keys: Array<string> = Array.from(this.data.recipient.placeholders.keys());

  constructor(@Inject(MAT_DIALOG_DATA) public data: { recipient: Recipient }) { }

  placeholderValueChange(key: string, event: string) {
    this.data.recipient.placeholders.set(key, event);
  }
}
