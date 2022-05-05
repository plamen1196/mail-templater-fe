import { Component, OnInit, Inject, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { EmailStateService } from 'src/services/email-state.service';
import { RecipientService } from 'src/services/recipient.service';
import { UtilService } from 'src/services/util.service';
import { EmailTemplate } from 'src/models/templates/email-template';
import { RecipientResource } from 'src/models/recipients/recipient-resource';
import { SelectRecipientsResult } from 'src/models/dialogs/select-recipient-result';

const COPY_TO_CLIPBOARD_ENABLED = 'Copy to clipboard';
const COPY_TO_CLIPBOARD_COPIED = 'Copied';

@Component({
  selector: 'app-recipients-list',
  templateUrl: './recipients-list.component.html',
  styleUrls: ['./recipients-list.component.scss']
})
export class RecipientsListComponent implements OnInit, OnDestroy {

  selectedEmailTemplate: EmailTemplate | null;
  recipients: Array<RecipientResource> = [];
  selectedRecipients: Array<RecipientResource>;
  recipientsTsvData: string = '';

  clipboardButtonDisabled = false;
  clipboardButtonText = COPY_TO_CLIPBOARD_ENABLED;

  private readonly destroy$ = new Subject<void>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {},
    private dialogRef: MatDialogRef<RecipientsListComponent>,
    private emailStateService: EmailStateService,
    private recipientService: RecipientService,
    private utilService: UtilService) { }

  ngOnInit(): void {
    this.fetchSelectedEmailTemplate();
    this.fetchRecipients();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onRecipientsSelectionChange(event: { value: Array<RecipientResource> }): void {
    this.selectedRecipients = event.value;

    this.populateRecipientsData();
  }

  onTabKey(event: Event): void {
    event.preventDefault();

    const target: HTMLTextAreaElement = event.target as HTMLTextAreaElement;
    const start = target.selectionStart;
    const end = target.selectionEnd;

    /* set textarea value to: text before caret + tab + text after caret  */
    target.value = target.value.substring(0, start) + "\t" + target.value.substring(end);

    /* put caret at right position again */
    target.selectionStart = (target.selectionEnd = start + 1);
  }

  onClipboardButtonClick(): void {
    this.clipboardButtonDisabled = true;
    this.clipboardButtonText = COPY_TO_CLIPBOARD_COPIED;

    setTimeout(() => {
      this.clipboardButtonDisabled = false;
      this.clipboardButtonText = COPY_TO_CLIPBOARD_ENABLED;
    }, 500);
  }

  onSubmitRecipients(): void {
    const emailRecipients = this.utilService.buildRecipients(this.recipientsTsvData, this.selectedEmailTemplate?.placeholders);
    const selectSecipientGroupResult: SelectRecipientsResult = { recipients: emailRecipients, cancelClicked: false };
    this.dialogRef.close(selectSecipientGroupResult);
  }

  onCancel(): void {
    const selectSecipientsResult: SelectRecipientsResult = { recipients: [], cancelClicked: true };
    this.dialogRef.close(selectSecipientsResult);
  }

  private fetchSelectedEmailTemplate(): void {
    this.emailStateService.getEmailTemplate()
      .pipe(takeUntil(this.destroy$))
      .subscribe((emailTemplate: EmailTemplate | null) => {
        this.selectedEmailTemplate = emailTemplate;
      })
  }

  private fetchRecipients(): void {
    this.recipientService.getRecipients()
      .subscribe((response: Array<RecipientResource>) => {
        this.recipients = response;
      });
  }

  private populateRecipientsData(): void {
    if (!this.selectedRecipients || !this.selectedRecipients.length) {
      return;
    }

    this.recipientsTsvData =
      this.utilService.buildRecipientsTsvData(this.selectedRecipients, this.selectedEmailTemplate?.placeholders);
  }
}
