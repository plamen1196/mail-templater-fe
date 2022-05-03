import { Component, OnInit, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { EmailTemplate } from 'src/models/templates/email-template';
import { TemplateService } from 'src/services/template.service';
import { SelectTemplateResult } from 'src/models/dialogs/select-template-result';

@Component({
  selector: 'app-templates-list',
  templateUrl: './templates-list.component.html',
  styleUrls: ['./templates-list.component.scss']
})
export class TemplatesListComponent implements OnInit {

  emailTemplates: Array<EmailTemplate> = [];
  selectedTemplate: EmailTemplate;
  titleSearchValue: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {},
    private dialogRef: MatDialogRef<TemplatesListComponent>,
    private templateService: TemplateService) { }

  ngOnInit(): void {
    this.fetchTemplates();
  }

  onClickTemplate(emailTemplate: EmailTemplate): void {
    this.selectedTemplate = emailTemplate;
  }

  onSubmitSelection(): void {
    const selectedTemplateResult: SelectTemplateResult = { selectedTemplate: this.selectedTemplate, cancelClicked: false };
    this.dialogRef.close(selectedTemplateResult);
  }

  onCancel(): void {
    const selectedTemplateResult: SelectTemplateResult = { selectedTemplate: this.selectedTemplate, cancelClicked: true };
    this.dialogRef.close(selectedTemplateResult);
  }

  private fetchTemplates(): void {
    this.templateService.getTemplates().subscribe((response: Array<EmailTemplate>) => {
      this.emailTemplates = response;
    });
  }
}
