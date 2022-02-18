import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { EmailTemplate } from 'src/models/templates/email-template';
import { TemplateService } from 'src/services/template.service';
import { CreateTemplateComponent } from './create-template/create-template.component';
import { DeleteTemplateComponent } from './delete-template/delete-template.component';
import { EditTemplateComponent } from './edit-template/edit-template.component';

@Component({
  selector: 'app-view-templates',
  templateUrl: './view-templates.component.html',
  styleUrls: ['./view-templates.component.scss']
})
export class ViewTemplatesComponent implements OnInit {

  emailTemplates: Array<EmailTemplate> = [];

  constructor(
    private dialog: MatDialog,
    private templateService: TemplateService,
    private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.fetchTemplates();
  }

  onCreateTemplate(): void {
    const dialogRef = this.dialog.open(CreateTemplateComponent, {
      data: {},
      disableClose: true,
      width: '700px',
      minHeight: 500,
      maxHeight: 800,
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(({ success, cancelClicked }) => {
      if (!cancelClicked) {
        const message = success ? "Template created successfully!" : "ERROR when creating template!";
        this.snackbar.open(message, undefined, {
          duration: 3000
        });

        this.fetchTemplates();
      }
    });
  }

  onEditTemplate(emailTemplate: EmailTemplate): void {
    const dialogRef = this.dialog.open(EditTemplateComponent, {
      data: { emailTemplate: emailTemplate },
      disableClose: true,
      width: '700px',
      minHeight: 500,
      maxHeight: 800,
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(({ success, cancelClicked }) => {
      if (!cancelClicked) {
        const message = success ? "Template edited successfully!" : "ERROR when editing template!";
        this.snackbar.open(message, undefined, {
          duration: 3000
        });

        this.fetchTemplates();
      }
    });
  }

  onDeleteTemplate(emailTemplate: EmailTemplate): void {
    const dialogRef = this.dialog.open(DeleteTemplateComponent, {
      data: { emailTemplate: emailTemplate },
      disableClose: true,
      width: '500px',
      minHeight: 200,
      maxHeight: 800,
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(({ success, cancelClicked }) => {
      if (!cancelClicked) {
        const message = success ? "Template deleted successfully!" : "ERROR when deleting template!";
        this.snackbar.open(message, undefined, {
          duration: 3000
        });

        this.fetchTemplates();
      }
    });
  }

  private fetchTemplates(): void {
    this.templateService.getTemplates().subscribe((response: Array<EmailTemplate>) => {
      this.emailTemplates = response;
    });
  }
}
