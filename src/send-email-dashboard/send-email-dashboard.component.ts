import { Component, OnInit } from '@angular/core';

import { EmailTemplate } from 'src/models/templates/email-template';

@Component({
  selector: 'app-send-email-dashboard',
  templateUrl: './send-email-dashboard.component.html',
  styleUrls: ['./send-email-dashboard.component.scss']
})
export class SendEmailDashboardComponent implements OnInit {

  selectedTemplate: EmailTemplate;

  constructor() { }

  ngOnInit(): void {

  }

  onSelectedTemplateChange(emailTemplate: EmailTemplate): void {
    this.selectedTemplate = emailTemplate;
  }

}
