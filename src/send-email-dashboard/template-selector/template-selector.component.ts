import { Component, Output, EventEmitter } from '@angular/core';

import { EmailTemplate } from 'src/models/templates/email-template';
import { MatDialog } from '@angular/material/dialog';

import { TemplatesListComponent } from '../templates-list/templates-list.component';
import { SelectTemplateResult } from 'src/models/dialogs/select-template-result';

@Component({
  selector: 'app-template-selector',
  templateUrl: './template-selector.component.html',
  styleUrls: ['./template-selector.component.scss']
})
export class TemplateSelectorComponent {

  selectedTemplate: EmailTemplate;

  @Output()
  readonly selectedTemplateChange: EventEmitter<EmailTemplate> = new EventEmitter();

  constructor(private dialog: MatDialog) { }

  onSelectTemplate(): void {
    const dialogRef = this.dialog.open(TemplatesListComponent, {
      data: {},
      disableClose: false,
      width: '700px',
      minHeight: 500,
      maxHeight: 800,
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe((selectedTemplateResult: SelectTemplateResult) => {
      if (!selectedTemplateResult || selectedTemplateResult.cancelClicked) {
        return;
      }

      this.selectedTemplate = selectedTemplateResult.selectedTemplate;
      this.selectedTemplateChange.emit(this.selectedTemplate);
    });
  }
}
