import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { RecipientResource } from 'src/models/recipients/recipient-resource';
import { RecipientService } from 'src/services/recipient.service';

@Component({
  selector: 'app-view-recipients',
  templateUrl: './view-recipients.component.html',
  styleUrls: ['./view-recipients.component.scss']
})
export class ViewRecipientsComponent implements OnInit {

  recipients: Array<RecipientResource> = [];

  constructor(
    private dialog: MatDialog,
    private recipientService: RecipientService,
    private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.fetchRecipients();
  }

  onCreateRecipient(): void {

  }

  onDeleteRecipient(recipient: RecipientResource): void {
    
  }

  onEditRecipient(recipient: RecipientResource): void {
    
  }

  private fetchRecipients(): void {
    this.recipientService.getRecipients().subscribe((recipients: Array<RecipientResource>) => {
      this.recipients = recipients;
    });
  }
}
