import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { RecipientGroupResource } from 'src/models/recipient-groups/recipient-group-resource';
import { RecipientGroupService } from 'src/services/recipient-group.service';

@Component({
  selector: 'app-delete-recipient-group',
  templateUrl: './delete-recipient-group.component.html',
  styleUrls: ['./delete-recipient-group.component.scss']
})
export class DeleteRecipientGroupComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { recipientGroupResource: RecipientGroupResource },
    private dialogRef: MatDialogRef<DeleteRecipientGroupComponent>,
    private recipientGroupService: RecipientGroupService) { }

  onDeleteRecipientGroup(): void {
    this.recipientGroupService.deleteRecipientGroup(this.data.recipientGroupResource.id).subscribe(
      (response: any) => { this.handleSucces(response); },
      (response: HttpErrorResponse) => { this.handleFailure(response); }
    );
  }

  onCancel(): void {
    this.dialogRef.close({ success: true, cancelClicked: true });
  }

  private handleSucces(response: RecipientGroupResource): void {
    this.dialogRef.close({ success: true, cancelClicked: false, deletedRecipientGroupId: this.data.recipientGroupResource.id, message: 'Recipient group deleted successfully!' });
  }

  private handleFailure(response: HttpErrorResponse): void {
    const message = response?.error?.message || 'ERROR when deleting recipient group!';
    this.dialogRef.close({ success: false, cancelClicked: false, message: message });
  }
}
