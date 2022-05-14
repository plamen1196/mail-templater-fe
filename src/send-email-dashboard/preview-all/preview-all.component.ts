import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { PreviewRecipientEmail } from 'src/models/preview-recipient-email';
import { Recipient } from 'src/models/recipient';
import { EmailTemplate } from 'src/models/templates/email-template';
import { EmailService } from 'src/services/email.service';

@Component({
  selector: 'app-preview-all',
  templateUrl: './preview-all.component.html',
  styleUrls: ['./preview-all.component.scss']
})
export class PreviewAllComponent implements OnInit {

  previewRecipientEmails: Array<PreviewRecipientEmail>;
  isLoading = false;

  constructor(
    private emailService: EmailService,
    @Inject(MAT_DIALOG_DATA) public data: { emailTemplate: EmailTemplate, recipients: Array<Recipient> }) { }


  ngOnInit(): void {
    this.previewAllEmails();
  }

  previewAllEmails(): void {
    this.isLoading = true;
    this.emailService.previewEmails(this.data.emailTemplate, this.data.recipients).subscribe(
      (response: Array<PreviewRecipientEmail>) => { this.handleSuccess(response); },
      (response: HttpErrorResponse) => { this.handleFailure(response); }
    );
  }

  private handleSuccess(response: Array<PreviewRecipientEmail>): void {
    this.previewRecipientEmails = response;
    this.isLoading = false;
    console.log(this.previewRecipientEmails);
  }

  private handleFailure(response: HttpErrorResponse): void {
    this.isLoading = false;
    console.error(response);
  }
}
