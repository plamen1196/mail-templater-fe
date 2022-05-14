import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { EmailTemplate } from 'src/models/templates/email-template';
import { TemplateService } from 'src/services/template.service';
import { UtilService } from 'src/services/util.service';

@Component({
  selector: 'app-create-template',
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.scss']
})
export class CreateTemplateComponent implements OnInit {

  formGroup: FormGroup;
  templatesMessageMaxLength: Observable<number>;

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: {},
    private dialogRef: MatDialogRef<CreateTemplateComponent>,
    private utilService: UtilService,
    private templateService: TemplateService,
    private cdr: ChangeDetectorRef) {
    /* Generate form */
    this.formGroup = this.generateForm();
  }

  ngOnInit(): void {
    this.templatesMessageMaxLength = this.templateService.templatesMessageMaxLength$.asObservable();
    this.cdr.detectChanges();
  }

  onCreateTemplate(): void {
    const emailTemplate = new EmailTemplate();
    emailTemplate.title = this.formGroup.controls['title'].value;
    emailTemplate.message = this.formGroup.controls['message'].value;
    emailTemplate.placeholders = this.utilService.extractPlaceholders(emailTemplate.message);

    this.templateService.createTemplate(emailTemplate).subscribe(
      (response: EmailTemplate) => { this.handleSucces(response); },
      (response: HttpErrorResponse) => { this.handleFailure(response); }
    );
  }

  onCancel(): void {
    this.dialogRef.close({ success: true, cancelClicked: true });
  }

  private generateForm(): FormGroup {
    const form: FormGroup = this.formBuilder.group({});

    form.addControl('title', new FormControl('', [Validators.required]));
    form.addControl('message', new FormControl('', [Validators.required]));

    return form;
  }

  private handleSucces(response: EmailTemplate): void {
    this.dialogRef.close({ success: true, cancelClicked: false, message: 'Template created successfully' });
  }

  private handleFailure(response: HttpErrorResponse): void {
    const message = response?.error?.message || 'ERROR when creating template!';
    this.dialogRef.close({ success: false, cancelClicked: false, message: message });
  }
}
