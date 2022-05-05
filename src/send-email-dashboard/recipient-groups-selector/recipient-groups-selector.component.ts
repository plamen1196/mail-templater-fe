import { Component, OnInit, Input } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { RecipientGroupsListComponent } from '../recipient-groups-list/recipient-groups-list.component';
import { SelectRecipientGroupResult } from 'src/models/dialogs/select-recipient-group-result';
import { EmailStateService } from 'src/services/email-state.service';

@Component({
  selector: 'app-recipient-groups-selector',
  templateUrl: './recipient-groups-selector.component.html',
  styleUrls: ['./recipient-groups-selector.component.scss']
})
export class RecipientGroupsSelectorComponent implements OnInit {

  @Input()
  disabled: boolean;

  constructor(
    private dialog: MatDialog,
    private emailStateService: EmailStateService) { }

  ngOnInit(): void {
  }

  onAddRecipientGroupsToRecipients(): void {
    const dialogRef = this.dialog.open(RecipientGroupsListComponent, {
      data: {},
      disableClose: false,
      width: '700px',
      minHeight: 500,
      maxHeight: 800,
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe((selectRecipientGroupsResult: SelectRecipientGroupResult) => {
      if (!selectRecipientGroupsResult
          || !selectRecipientGroupsResult.recipients?.length
          || selectRecipientGroupsResult.cancelClicked) {
        return;
      }

      this.emailStateService.addEmailRecipients(selectRecipientGroupsResult.recipients);
    });
  }
}
