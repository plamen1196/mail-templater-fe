import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { EmailTemplate } from 'src/models/templates/email-template';
import { Recipient } from 'src/models/recipient';
import { EmailService } from 'src/services/email.service';
import { HttpErrorResponse } from '@angular/common/http/http';
import { EmailStateService } from 'src/services/email-state.service';

@Component({
  selector: 'app-email-sender',
  templateUrl: './email-sender.component.html',
  styleUrls: ['./email-sender.component.scss']
})
export class EmailSenderComponent implements OnInit, OnDestroy {

  emailTemplate: EmailTemplate | null;
  recipients: Array<Recipient>;
  html = false;
  sending = false;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private dialog: MatDialog,
    private mailService: EmailService,
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

  removeRecipient(recipient: Recipient): void {
    // const index = this.recipients.indexOf(recipient);

    // if (index >= 0) {
    //   this.recipients.splice(index, 1);
    // }
  }

  editRecipient(recipient: Recipient): void {
    // const dialogRef = this.dialog.open(EditRecipientComponent, {
    //   data: { recipient: recipient },
    //   disableClose: true,
    //   minWidth: 400,
    //   minHeight: 300,
    //   autoFocus: false
    // });
  }

  send(): void {
    // console.log(this.html);
    // this.sending = true;
    // this.mailService.sendMail(this.emailTemplate, this.recipients, this.html).subscribe(
    //   (response: number) => { this.handleSuccess(response); },
    //   (response: HttpErrorResponse) => { this.handleFailure(response); }
    // );
  }

  preview(): void {
    // const dialogRef = this.dialog.open(PreviewComponent, {
    //   data: { emailTemplate: this.emailTemplate, recipients: this.recipients },
    //   disableClose: false,
    //   minWidth: 600,
    //   minHeight: 300,
    //   autoFocus: false
    // });
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
