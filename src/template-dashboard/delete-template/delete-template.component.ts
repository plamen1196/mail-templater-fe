import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { EmailTemplate } from 'src/models/templates/email-template';
import { TemplateService } from 'src/services/template.service';

@Component({
  selector: 'app-delete-template',
  templateUrl: './delete-template.component.html',
  styleUrls: ['./delete-template.component.scss']
})
export class DeleteTemplateComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { emailTemplate: EmailTemplate },
    private dialogRef: MatDialogRef<DeleteTemplateComponent>,
    private templateService: TemplateService) { }

  onDeleteTemplate(): void {
    this.templateService.deleteTemplate(this.data.emailTemplate.id).subscribe(
      (response: any) => { this.handleSucces(response); },
      (response: HttpErrorResponse) => { this.handleFailure(response); }
    );
  }

  onCancel(): void {
    this.dialogRef.close({ success: true, cancelClicked: true });
  }

  private handleSucces(response: EmailTemplate): void {
    this.dialogRef.close({ success: true, cancelClicked: false, message: 'Template deleted successfully!' });
  }

  private handleFailure(response: HttpErrorResponse): void {
    const message = response?.error?.message || 'ERROR when deleting template!';
    this.dialogRef.close({ success: false, cancelClicked: false, message: message });
  }
}
