import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { EmailTemplate } from 'src/models/templates/email-template';
import { Recipient } from 'src/models/recipient';
import { EmailStateService } from 'src/services/email-state.service';

@Component({
  selector: 'app-send-email-dashboard',
  templateUrl: './send-email-dashboard.component.html',
  styleUrls: ['./send-email-dashboard.component.scss']
})
export class SendEmailDashboardComponent implements OnInit, OnDestroy {

  selectedEmailTemplate: EmailTemplate | null;
  recipients: Array<Recipient> = [];

  private readonly destroy$ = new Subject<void>();

  constructor(private emailStateService: EmailStateService) { }

  ngOnInit(): void {
    this.fetchSelectedEmailTemplate();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSelectedTemplateChange(emailTemplate: EmailTemplate): void {
    if (this.selectedEmailTemplate !== emailTemplate) {
      this.emailStateService.setEmailTemplate(emailTemplate);
      this.emailStateService.setRecipients([]);
    }
  }

  private fetchSelectedEmailTemplate(): void {
    this.emailStateService.getEmailTemplate()
      .pipe(takeUntil(this.destroy$))
      .subscribe((emailTemplate: EmailTemplate | null) => {
        this.selectedEmailTemplate = emailTemplate;
      })
  }
}
