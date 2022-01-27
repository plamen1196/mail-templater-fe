import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmailTemplate } from 'src/models/email-template';
import { TemplateService } from 'src/services/template.service';
import { UtilService } from 'src/services/util.service';

@Component({
  selector: 'app-edit-template',
  templateUrl: './edit-template.component.html',
  styleUrls: ['./edit-template.component.scss']
})
export class EditTemplateComponent implements OnInit {

  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { emailTemplate: EmailTemplate },
    private dialogRef: MatDialogRef<EditTemplateComponent>,
    private utilService: UtilService,
    private templateService: TemplateService) { }

  ngOnInit(): void {
    this.generateForm();
  }

  onSaveTemplate(): void {
    const emailTemplate = new EmailTemplate();
    const id = this.data.emailTemplate.id;

    emailTemplate.title = this.formGroup.controls['title'].value;
    emailTemplate.message = this.formGroup.controls['message'].value;
    emailTemplate.placeholders = this.utilService.extractPlaceholders(emailTemplate.message);

    this.templateService.editTemplate(id, emailTemplate).subscribe(
      (response: EmailTemplate) => { this.handleSucces(response); },
      (response: HttpErrorResponse) => { this.handleFailure(response); }
    );
  }

  onCancel(): void {
    this.dialogRef.close({ success: true, cancelClicked: true });
  }

  private generateForm(): void {
    const form: FormGroup = this.formBuilder.group({});

    form.addControl('title', new FormControl(this.data.emailTemplate.title, [Validators.required]));
    form.addControl('message', new FormControl(this.data.emailTemplate.message, [Validators.required]));

    this.formGroup = form;
  }

  private handleSucces(response: EmailTemplate): void {
    this.dialogRef.close({ success: true, cancelClicked: false });
  }

  private handleFailure(response: HttpErrorResponse): void {
    this.dialogRef.close({ success: false, cancelClicked: false });
  }
}
