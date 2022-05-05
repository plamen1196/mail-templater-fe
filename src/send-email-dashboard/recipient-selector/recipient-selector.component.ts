import { Component, OnInit, Input } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { EmailStateService } from 'src/services/email-state.service';
import { SelectRecipientsResult } from 'src/models/dialogs/select-recipient-result';
import { RecipientsListComponent } from '../recipients-list/recipients-list.component';

@Component({
  selector: 'app-recipient-selector',
  templateUrl: './recipient-selector.component.html',
  styleUrls: ['./recipient-selector.component.scss']
})
export class RecipientSelectorComponent implements OnInit {

  @Input()
  disabled: boolean;

  constructor(
    private dialog: MatDialog,
    private emailStateService: EmailStateService) { }

  ngOnInit(): void {
  }

  onAddRecipientsToEmailRecipients(): void {
    const dialogRef = this.dialog.open(RecipientsListComponent, {
      data: {},
      disableClose: false,
      width: '700px',
      minHeight: 500,
      maxHeight: 800,
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe((selectRecipientsResult: SelectRecipientsResult) => {
      if (!selectRecipientsResult
          || !selectRecipientsResult.recipients?.length
          || selectRecipientsResult.cancelClicked) {
        return;
      }

      this.emailStateService.addEmailRecipients(selectRecipientsResult.recipients);
    });
  }
}
