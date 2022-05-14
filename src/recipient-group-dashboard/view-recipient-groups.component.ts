import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { RecipientGroupResource } from 'src/models/recipient-groups/recipient-group-resource';
import { RecipientGroupService } from 'src/services/recipient-group.service';
import { CreateRecipientGroupComponent } from './create-recipient-group/create-recipient-group.component';
import { DeleteRecipientGroupComponent } from './delete-recipient-group/delete-recipient-group.component';
import { EditRecipientGroupComponent } from './edit-recipient-group/edit-recipient-group.component';

@Component({
  selector: 'app-view-recipient-groups',
  templateUrl: './view-recipient-groups.component.html',
  styleUrls: ['./view-recipient-groups.component.scss']
})
export class ViewRecipientGroupsComponent implements OnInit {

  recipientGroups: Array<RecipientGroupResource> = [];
  selectedRecipientGroup: RecipientGroupResource | null;
  titleSearchValue: string = '';

  constructor(
    private dialog: MatDialog,
    private recipientGroupService: RecipientGroupService,
    private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.fetchRecipientGroups();
  }

  onCreateRecipientGroup(): void {
    const dialogRef = this.dialog.open(CreateRecipientGroupComponent, {
      data: {},
      disableClose: true,
      width: '700px',
      minHeight: 500,
      maxHeight: 800,
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(({ success, cancelClicked, message }) => {
      if (!cancelClicked) {
        this.snackbar.open(message, undefined, {
          duration: 3000
        });

        this.fetchRecipientGroups();
      }
    });
  }

  onEditRecipientGroup(recipientGroupResource: RecipientGroupResource): void {
    const dialogRef = this.dialog.open(EditRecipientGroupComponent, {
      data: { recipientGroupResource: recipientGroupResource },
      disableClose: true,
      width: '700px',
      minHeight: 500,
      maxHeight: 800,
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(({ success, cancelClicked, editedRecipientGroupResourceId, message }) => {
      if (!cancelClicked) {
        this.snackbar.open(message, undefined, {
          duration: 3000
        });

        this.fetchRecipientGroups(() => {
          /* If the edited recipient group was the selected one, then reset the selection. */
          if (success &&
              editedRecipientGroupResourceId &&
              (editedRecipientGroupResourceId === this.selectedRecipientGroup?.id)) {
            const recipientGroup = this.recipientGroups.find(rc => rc.id === editedRecipientGroupResourceId);

            this.selectedRecipientGroup = recipientGroup ? recipientGroup : null;
          }
        });
      }
    });
  }

  onDeleteRecipientGroup(recipientGroupResource: RecipientGroupResource): void {
    const dialogRef = this.dialog.open(DeleteRecipientGroupComponent, {
      data: { recipientGroupResource: recipientGroupResource },
      disableClose: true,
      width: '500px',
      minHeight: 200,
      maxHeight: 800,
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(({ success, cancelClicked, deletedRecipientGroupId, message }) => {
      if (!cancelClicked) {
        this.snackbar.open(message, undefined, {
          duration: 3000
        });

        this.fetchRecipientGroups(() => {
          /* If the deleted recipient group was the selected one, then reset the selection. */
          if (success &&
              deletedRecipientGroupId &&
              (deletedRecipientGroupId === this.selectedRecipientGroup?.id)) {
            this.selectedRecipientGroup = null;
          }
        });
      }
    });
  }

  onSelectRecipientGroup(recipientGroupResource: RecipientGroupResource): void {    
    this.selectedRecipientGroup = recipientGroupResource;
  }

  private fetchRecipientGroups(callback?: () => void): void {
    this.recipientGroupService.getRecipientGroups().subscribe((response: Array<RecipientGroupResource>) => {
      this.recipientGroups = response;

      if (callback) {
        callback();
      }
    });
  }
}
