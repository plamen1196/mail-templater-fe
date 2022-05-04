import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RecipientGroupService } from 'src/services/recipient-group.service';
import { RecipientGroupResource } from 'src/models/recipient-groups/recipient-group-resource';

@Component({
  selector: 'app-recipient-groups-list',
  templateUrl: './recipient-groups-list.component.html',
  styleUrls: ['./recipient-groups-list.component.scss']
})
export class RecipientGroupsListComponent implements OnInit {

  recipientGroups: Array<RecipientGroupResource> = [];
  selectedRecipientGroup: RecipientGroupResource;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {},
    private dialogRef: MatDialogRef<RecipientGroupsListComponent>,
    private recipientGroupService: RecipientGroupService) { }

  ngOnInit(): void {
    this.fetchRecipientGroups();
  }

  onGroupRecipientsSelectionChange(event: { value: RecipientGroupResource }): void {
    console.log(event.value);
  }


  onSubmitSelection(): void {
  }

  onCancel(): void {
  }

  private fetchRecipientGroups(): void {
    this.recipientGroupService.getRecipientGroups().subscribe((response: Array<RecipientGroupResource>) => {
      this.recipientGroups = response;
    });
  }
}
