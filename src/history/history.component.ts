import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';

import { SentEmailResource } from 'src/models/sent-email-resource';
import { EmailService } from 'src/services/email.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent {

  formGroup: FormGroup;
  sentEmails: Array<SentEmailResource> = [];
  historyRecordsHeading: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private emailService: EmailService,
    private snackbar: MatSnackBar) {
    this.formGroup = this.generateForm();
  }

  onLoadFullHistory(): void {
    this.historyRecordsHeading = 'Full history';
    this.emailService.getHistory().subscribe(
      (response: Array<SentEmailResource>) => { this.handleSucces(response); },
      (response: HttpErrorResponse) => { this.handleFailure(response); }
    );
  }

  onSubmitDateRange(): void {
    const startDate: Date = this.formGroup.controls['startDate'].value;
    const endDate: Date = this.formGroup.controls['endDate'].value;

    if (!startDate || !endDate) {
      return;
    }

    this.historyRecordsHeading =
      `History between ${startDate.toLocaleDateString('en-GB')} and ${endDate.toLocaleDateString('en-GB')}`;

    this.emailService.getHistory(startDate, endDate).subscribe(
      (response: Array<SentEmailResource>) => { this.handleSucces(response); },
      (response: HttpErrorResponse) => { this.handleFailure(response); }
    );
  }

  private generateForm(): FormGroup {
    const form: FormGroup = this.formBuilder.group({});

    form.addControl('startDate', new FormControl(new Date()));
    form.addControl('endDate', new FormControl(new Date()));

    return form;
  }

  private handleSucces(response: Array<SentEmailResource>): void {
    this.sentEmails = response;
  }

  private handleFailure(response: HttpErrorResponse): void {
    this.snackbar.open("Error while fetching full history: " + response.error + ", " + response.message, undefined, {
      duration: 3000
    });
  }
}
