import { Component, OnInit } from '@angular/core';

import { EmailTemplate } from 'src/models/templates/email-template';
import { Recipient } from 'src/models/recipient';

@Component({
  selector: 'app-send-email-dashboard',
  templateUrl: './send-email-dashboard.component.html',
  styleUrls: ['./send-email-dashboard.component.scss']
})
export class SendEmailDashboardComponent implements OnInit {

  selectedTemplate: EmailTemplate;
  recipients: Array<Recipient> = [];

  constructor() { }

  ngOnInit(): void {

  }

  onSelectedTemplateChange(emailTemplate: EmailTemplate): void {
    if (this.selectedTemplate !== emailTemplate) {
      this.selectedTemplate = emailTemplate;
      this.recipients = [];
    }
  }
}
