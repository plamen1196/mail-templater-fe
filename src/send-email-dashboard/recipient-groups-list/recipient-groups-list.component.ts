import { Component, OnInit, Inject, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { RecipientGroupService } from 'src/services/recipient-group.service';
import { RecipientGroupResource } from 'src/models/recipient-groups/recipient-group-resource';
import { EmailStateService } from 'src/services/email-state.service';
import { EmailTemplate } from 'src/models/templates/email-template';
import { RecipientResource } from 'src/models/recipients/recipient-resource';
import { UtilService } from 'src/services/util.service';
import { SelectRecipientGroupResult } from 'src/models/dialogs/select-recipient-group-result';

const COPY_TO_CLIPBOARD_ENABLED = 'Copy to clipboard';
const COPY_TO_CLIPBOARD_COPIED = 'Copied';

@Component({
  selector: 'app-recipient-groups-list',
  templateUrl: './recipient-groups-list.component.html',
  styleUrls: ['./recipient-groups-list.component.scss']
})
export class RecipientGroupsListComponent implements OnInit, OnDestroy {

  selectedEmailTemplate: EmailTemplate | null;
  recipientGroups: Array<RecipientGroupResource> = [];
  selectedRecipientGroup: RecipientGroupResource;
  recipientsTsvData: string = '';

  clipboardButtonDisabled = false;
  clipboardButtonText = COPY_TO_CLIPBOARD_ENABLED;

  private readonly destroy$ = new Subject<void>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {},
    private dialogRef: MatDialogRef<RecipientGroupsListComponent>,
    private emailStateService: EmailStateService,
    private recipientGroupService: RecipientGroupService,
    private utilService: UtilService) { }

  ngOnInit(): void {
    this.fetchSelectedEmailTemplate();
    this.fetchRecipientGroups();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onRecipientGroupSelectionChange(event: { value: RecipientGroupResource }): void {
    this.selectedRecipientGroup = event.value;

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
    const selectSecipientGroupResult: SelectRecipientGroupResult = { recipients: emailRecipients, cancelClicked: false };
    this.dialogRef.close(selectSecipientGroupResult);
  }

  onCancel(): void {
    const selectSecipientGroupResult: SelectRecipientGroupResult = { recipients: [], cancelClicked: true };
    this.dialogRef.close(selectSecipientGroupResult);
  }

  private fetchSelectedEmailTemplate(): void {
    this.emailStateService.getEmailTemplate()
      .pipe(takeUntil(this.destroy$))
      .subscribe((emailTemplate: EmailTemplate | null) => {
        this.selectedEmailTemplate = emailTemplate;
      })
  }

  private fetchRecipientGroups(): void {
    this.recipientGroupService.getRecipientGroups()
    .subscribe((response: Array<RecipientGroupResource>) => {
      this.recipientGroups = response;
    });
  }

  private populateRecipientsData(): void {
    if (!this.selectedRecipientGroup) {
      return;
    }

    /* No recipient ids means that the group is empty */
    if (!this.selectedRecipientGroup.recipientIds) {
      this.recipientsTsvData = '';
    }

    this.recipientGroupService.getRecipientsOfRecipientGroupById(this.selectedRecipientGroup.id).subscribe(
      (recipients: Array<RecipientResource>) => {
      this.recipientsTsvData =
        this.utilService.buildRecipientsTsvData(recipients, this.selectedEmailTemplate?.placeholders);
        console.log(this.recipientsTsvData);
    });
  }
}
