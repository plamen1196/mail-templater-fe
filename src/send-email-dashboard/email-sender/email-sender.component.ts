import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http/http';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';

import { EmailTemplate } from 'src/models/templates/email-template';
import { Recipient } from 'src/models/recipient';
import { EmailService } from 'src/services/email.service';
import { EmailStateService } from 'src/services/email-state.service';
import { RecipientResource } from 'src/models/recipients/recipient-resource';
import { EditEmailRecipientComponent } from '../edit-email-recipient/edit-email-recipient.component';
import { PreviewAllComponent } from '../preview-all/preview-all.component';

@Component({
  selector: 'app-email-sender',
  templateUrl: './email-sender.component.html',
  styleUrls: ['./email-sender.component.scss']
})
export class EmailSenderComponent implements OnInit, OnDestroy {

  emailTemplate: EmailTemplate | null;
  recipients: Array<Recipient>;
  isHtml = false;
  sending = false;

  @ViewChild('previewAs', { read: MatSelect }) previewAsSelect: MatSelect;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private dialog: MatDialog,
    private emailService: EmailService,
    private emailStateService: EmailStateService,
    private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.fetchSelectedEmailTemplate();
    this.fetchEmailRecipients();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  clearRecipients(): void {
    this.emailStateService.setEmailRecipients([]);
  }

  removeRecipient(recipient: Recipient): void {
    this.emailStateService.removeEmailRecipient(recipient);
  }

  editRecipient(recipient: Recipient): void {
    const dialogRef = this.dialog.open(EditEmailRecipientComponent, {
      data: { recipient: recipient },
      disableClose: true,
      minWidth: 400,
      minHeight: 300,
      autoFocus: false
    });
  }

  send(): void {
    if (!this.emailTemplate) {
      return;
    }

    this.sending = true;
    this.emailService.sendEmails(this.emailTemplate, this.recipients, this.isHtml).subscribe(
      (response: number) => { this.handleSuccess(response); },
      (response: HttpErrorResponse) => { this.handleFailure(response); }
    );
  }

  onPreviewAsSelectionChange(event: { value: RecipientResource }): void {
    if (!this.previewAsSelect.selected) {
      return;
    }

    const singleRecipientList = [event.value];
    const dialogRef = this.dialog.open(PreviewAllComponent, {
      data: { emailTemplate: this.emailTemplate, recipients: singleRecipientList },
      disableClose: false,
      minWidth: 600,
      minHeight: 800,
      autoFocus: false
    });

    (this.previewAsSelect.selected as MatOption).deselect();
  }

  previewAll(): void {
    const dialogRef = this.dialog.open(PreviewAllComponent, {
      data: { emailTemplate: this.emailTemplate, recipients: this.recipients },
      disableClose: false,
      minWidth: 600,
      minHeight: 800,
      autoFocus: false
    });
  }

  private handleSuccess(response: number): void {
    this.sending = false;
    this.snackbar.open(`${response} message(s) sent successfully!`, undefined, {
      duration: 3000
    });
  }

  private handleFailure(response: HttpErrorResponse): void {
    this.sending = false;
    this.snackbar.open("ERROR when sending message!", undefined, {
      duration: 3000
    });
  }

  private fetchSelectedEmailTemplate(): void {
    this.emailStateService.getEmailTemplate()
      .pipe(takeUntil(this.destroy$))
      .subscribe((emailTemplate: EmailTemplate | null) => {
        this.emailTemplate = emailTemplate;
      })
  }

  private fetchEmailRecipients(): void {
    this.emailStateService.getEmailRecipients()
      .pipe(takeUntil(this.destroy$))
      .subscribe((recipients: Array<Recipient>) => {
        this.recipients = recipients;
      });
  }
}
