import { Component, OnInit } from '@angular/core';

import { EmailTemplate } from 'src/models/templates/email-template';
import { MatDialog } from '@angular/material/dialog';
import { TemplateService } from 'src/services/template.service';

@Component({
  selector: 'app-template-selector',
  templateUrl: './template-selector.component.html',
  styleUrls: ['./template-selector.component.scss']
})
export class TemplateSelectorComponent implements OnInit {

  emailTemplates: Array<EmailTemplate> = [];
  titleSearchValue: string = '';

  constructor(
    private dialog: MatDialog,
    private templateService: TemplateService) { }

  ngOnInit(): void {
    this.fetchTemplates();
  }

  private fetchTemplates(): void {
    this.templateService.getTemplates().subscribe((response: Array<EmailTemplate>) => {
      this.emailTemplates = response;
    });
  }
}
