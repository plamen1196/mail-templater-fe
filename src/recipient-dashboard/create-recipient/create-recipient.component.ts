import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RecipientResource } from 'src/models/recipients/recipient-resource';
import { RecipientService } from 'src/services/recipient.service';

@Component({
  selector: 'app-create-recipient',
  templateUrl: './create-recipient.component.html',
  styleUrls: ['./create-recipient.component.scss']
})
export class CreateRecipientComponent {

  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: {},
    private dialogRef: MatDialogRef<CreateRecipientComponent>,
    private recipientService: RecipientService) {
    /* Generate form */
    this.formGroup = this.generateForm();
  }
  
  onCreateRecipient(): void {
    const recipientResource = new RecipientResource();
    recipientResource.email = this.formGroup.controls['email'].value;
    recipientResource.firstName = this.formGroup.controls['firstName'].value;
    recipientResource.lastName = this.formGroup.controls['lastName'].value;
    recipientResource.phoneNumber = this.formGroup.controls['phoneNumber'].value;
    recipientResource.address = this.formGroup.controls['address'].value;

    this.recipientService.createRecipient(recipientResource).subscribe(
      (response: RecipientResource) => { this.handleSucces(response); },
      (response: HttpErrorResponse) => { this.handleFailure(response); }
    );
  }

  onCancel(): void {
    this.dialogRef.close({ success: true, cancelClicked: true });
  }

  private generateForm(): FormGroup {
    const form: FormGroup = this.formBuilder.group({});

    form.addControl('email', new FormControl('', [Validators.required]));
    form.addControl('firstName', new FormControl(''));
    form.addControl('lastName', new FormControl(''));
    form.addControl('phoneNumber', new FormControl(''));
    form.addControl('address', new FormControl(''));

    return form;
  }

  private handleSucces(response: RecipientResource): void {
    this.dialogRef.close({ success: true, cancelClicked: false });
  }

  private handleFailure(response: HttpErrorResponse): void {
    this.dialogRef.close({ success: false, cancelClicked: false });
  }
}
