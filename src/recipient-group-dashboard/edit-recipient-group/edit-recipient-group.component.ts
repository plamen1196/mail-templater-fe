import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { RecipientGroupResource } from 'src/models/recipient-groups/recipient-group-resource';
import { RecipientResource } from 'src/models/recipients/recipient-resource';
import { RecipientGroupService } from 'src/services/recipient-group.service';
import { RecipientService } from 'src/services/recipient.service';
import { UtilService } from 'src/services/util.service';

@Component({
  selector: 'app-edit-recipient-group',
  templateUrl: './edit-recipient-group.component.html',
  styleUrls: ['./edit-recipient-group.component.scss']
})
export class EditRecipientGroupComponent implements OnInit {

  formGroup: FormGroup;
  recipients: Array<RecipientResource> = [];
  chipsRecipients: Array<RecipientResource> = [];

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { recipientGroupResource: RecipientGroupResource },
    private dialogRef: MatDialogRef<EditRecipientGroupComponent>,
    private recipientService: RecipientService,
    private recipientGroupService: RecipientGroupService,
    private utilService: UtilService) {
    /* Generate form */
    this.formGroup = this.generateForm();
  }

  ngOnInit(): void {
    this.fetchAllRecipients();
  }

  onSaveRecipientGroup(): void {
    const recipientGroupResource = new RecipientGroupResource();
    const id = this.data.recipientGroupResource.id;

    recipientGroupResource.title = this.formGroup.controls['title'].value;
    recipientGroupResource.recipientIds =
      this.utilService.buildCommaSeparatedString(this.formGroup.controls['groupRecipients'].value);

    this.recipientGroupService.editRecipientGroup(id, recipientGroupResource).subscribe(
      (response: RecipientGroupResource) => { this.handleSucces(response); },
      (response: HttpErrorResponse) => { this.handleFailure(response); }
    );
  }

  onGroupRecipientsSelectionChange(event: { value: Array<number> }): void {
    this.chipsRecipients = this.utilService.getRecipientResourcesFromIds(this.recipients, event.value);
  }

  onCancel(): void {
    this.dialogRef.close({ success: true, cancelClicked: true });
  }

  private generateForm(): FormGroup {
    const form: FormGroup = this.formBuilder.group({});

    form.addControl('title', new FormControl(this.data.recipientGroupResource.title));
    form.addControl('groupRecipients', new FormControl(
      this.utilService.buildArrayFromCommaSeparatedString(this.data.recipientGroupResource.recipientIds)));

    return form;
  }

  private handleSucces(response: RecipientGroupResource): void {
    this.dialogRef.close({ success: true, cancelClicked: false, editedRecipientGroupResourceId: this.data.recipientGroupResource.id });
  }

  private handleFailure(response: HttpErrorResponse): void {
    this.dialogRef.close({ success: false, cancelClicked: false });
  }

  private fetchAllRecipients(): void {
    this.recipientService.getRecipients().subscribe((recipients: Array<RecipientResource>) => {
      this.recipients = recipients;

      /* Populate initial chips recipients. */
      this.chipsRecipients = this.utilService.getRecipientResourcesFromIds(
        this.recipients,
        this.utilService.buildArrayFromCommaSeparatedString(this.data.recipientGroupResource.recipientIds));
    });  
  }
}
