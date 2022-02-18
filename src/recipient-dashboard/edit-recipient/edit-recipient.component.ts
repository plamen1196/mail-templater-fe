import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { RecipientResource } from 'src/models/recipients/recipient-resource';
import { RecipientService } from 'src/services/recipient.service';

@Component({
  selector: 'app-edit-recipient',
  templateUrl: './edit-recipient.component.html',
  styleUrls: ['./edit-recipient.component.scss']
})
export class EditRecipientComponent implements OnInit {

  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { recipientResource: RecipientResource },
    private dialogRef: MatDialogRef<EditRecipientComponent>,
    private recipientService: RecipientService) { }

  ngOnInit(): void {
    this.formGroup = this.generateForm();
  }

  onSaveRecipient(): void {
    const recipientResource = new RecipientResource();
    const id = this.data.recipientResource.id;

    recipientResource.email = this.formGroup.controls['email'].value;
    recipientResource.firstName = this.formGroup.controls['firstName'].value;
    recipientResource.lastName = this.formGroup.controls['lastName'].value;
    recipientResource.phoneNumber = this.formGroup.controls['phoneNumber'].value;
    recipientResource.address = this.formGroup.controls['address'].value;

    this.recipientService.editRecipient(id, recipientResource).subscribe(
      (response: RecipientResource) => { this.handleSucces(response); },
      (response: HttpErrorResponse) => { this.handleFailure(response); }
    );
  }

  onCancel(): void {
    this.dialogRef.close({ success: true, cancelClicked: true });
  }

  private generateForm(): FormGroup {
    const form: FormGroup = this.formBuilder.group({});

    form.addControl('email', new FormControl(this.data.recipientResource.email));
    form.addControl('firstName', new FormControl(this.data.recipientResource.firstName));
    form.addControl('lastName', new FormControl(this.data.recipientResource.lastName));
    form.addControl('phoneNumber', new FormControl(this.data.recipientResource.phoneNumber));
    form.addControl('address', new FormControl(this.data.recipientResource.address));

    return form;
  }

  private handleSucces(response: RecipientResource): void {
    console.log(response);
    this.dialogRef.close({ success: true, cancelClicked: false });
  }

  private handleFailure(response: HttpErrorResponse): void {
    this.dialogRef.close({ success: false, cancelClicked: false });
  }
}
