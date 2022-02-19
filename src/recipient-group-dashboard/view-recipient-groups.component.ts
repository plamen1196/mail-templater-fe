import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RecipientGroupResource } from 'src/models/recipient-groups/recipient-group-resource';
import { RecipientGroupService } from 'src/services/recipient-group.service';

@Component({
  selector: 'app-view-recipient-groups',
  templateUrl: './view-recipient-groups.component.html',
  styleUrls: ['./view-recipient-groups.component.scss']
})
export class ViewRecipientGroupsComponent implements OnInit {

  recipientGroups: Array<RecipientGroupResource> = [];
  selectedRecipientGroup: RecipientGroupResource;
  titleSearchValue: string = '';

  constructor(
    private dialog: MatDialog,
    private recipientGroupService: RecipientGroupService,
    private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.fetchRecipientGroups();
  }

  onCreateRecipientGroup(): void {

  }

  onEditRecipientGroup(recipientGroupResource: RecipientGroupResource): void {

  }

  onDeleteRecipientGroup(recipientGroupResource: RecipientGroupResource): void {

  }

  onSelectRecipientGroup(recipientGroupResource: RecipientGroupResource): void {
    this.selectedRecipientGroup = recipientGroupResource;
  }

  private fetchRecipientGroups(): void {
    this.recipientGroupService.getRecipientGroups().subscribe((response: Array<RecipientGroupResource>) => {
      this.recipientGroups = response;
    });
  }
}
