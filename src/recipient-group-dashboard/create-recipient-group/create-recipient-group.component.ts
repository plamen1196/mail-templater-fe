import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { RecipientGroupResource } from 'src/models/recipient-groups/recipient-group-resource';
import { RecipientResource } from 'src/models/recipients/recipient-resource';
import { RecipientGroupService } from 'src/services/recipient-group.service';
import { RecipientService } from 'src/services/recipient.service';
import { UtilService } from 'src/services/util.service';

@Component({
  selector: 'app-create-recipient-group',
  templateUrl: './create-recipient-group.component.html',
  styleUrls: ['./create-recipient-group.component.scss']
})
export class CreateRecipientGroupComponent implements OnInit {

  formGroup: FormGroup;
  recipients: Array<RecipientResource> = [];
  chipsRecipients: Array<RecipientResource> = [];

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: {},
    private dialogRef: MatDialogRef<CreateRecipientGroupComponent>,
    private recipientService: RecipientService,
    private recipientGroupService: RecipientGroupService,
    private utilService: UtilService) {
    /* Generate form */
    this.formGroup = this.generateForm();
  }

  ngOnInit(): void {
    this.fetchAllRecipients();
  }

  onCreateRecipientGroup(): void {
    const recipientGroupResource = new RecipientGroupResource();
    recipientGroupResource.title = this.formGroup.controls['title'].value;
    recipientGroupResource.recipientIds =
      this.utilService.buildCommaSeparatedString(this.formGroup.controls['groupRecipients'].value);

    this.recipientGroupService.createRecipientGroup(recipientGroupResource).subscribe(
      (response: RecipientGroupResource) => { this.handleSucces(response); },
      (response: HttpErrorResponse) => { this.handleFailure(response); }
    );
  }

  onGroupRecipientsSelectionChane(event: { value: Array<number> }): void {
    this.chipsRecipients = this.utilService.getRecipientResourcesFromIds(this.recipients, event.value);
  }

  onCancel(): void {
    this.dialogRef.close({ success: true, cancelClicked: true });
  }

  private generateForm(): FormGroup {
    const form: FormGroup = this.formBuilder.group({});

    form.addControl('title', new FormControl('', [Validators.required]));
    form.addControl('groupRecipients', new FormControl(''));

    return form;
  }

  private handleSucces(response: RecipientGroupResource): void {
    this.dialogRef.close({ success: true, cancelClicked: false });
  }

  private handleFailure(response: HttpErrorResponse): void {
    this.dialogRef.close({ success: false, cancelClicked: false });
  }

  private fetchAllRecipients(): void {
    this.recipientService.getRecipients().subscribe((recipients: Array<RecipientResource>) => {
      this.recipients = recipients;
    });
  }
}
