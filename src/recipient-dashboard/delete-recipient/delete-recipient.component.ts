import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { RecipientResource } from 'src/models/recipients/recipient-resource';
import { RecipientService } from 'src/services/recipient.service';

@Component({
  selector: 'app-delete-recipient',
  templateUrl: './delete-recipient.component.html',
  styleUrls: ['./delete-recipient.component.scss']
})
export class DeleteRecipientComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { recipientResource: RecipientResource },
    private dialogRef: MatDialogRef<DeleteRecipientComponent>,
    private recipientService: RecipientService) { }

  onDeleteRecipient(): void {
    this.recipientService.deleteRecipient(this.data.recipientResource.id).subscribe(
      (response: any) => { this.handleSucces(response); },
      (response: HttpErrorResponse) => { this.handleFailure(response); }
    );
  }

  onCancel(): void {
    this.dialogRef.close({ success: true, cancelClicked: true });
  }

  private handleSucces(response: RecipientResource): void {
    this.dialogRef.close({ success: true, cancelClicked: false });
  }

  private handleFailure(response: HttpErrorResponse): void {
    this.dialogRef.close({ success: false, cancelClicked: false });
  }
}
