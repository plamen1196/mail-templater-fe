import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';

import { MatSnackBar } from '@angular/material/snack-bar';

import { SentEmailResource } from 'src/models/sent-email-resource';
import { EmailService } from 'src/services/email.service';
import { UtilService } from 'src/services/util.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent {

  formGroup: FormGroup;
  sentEmails: Array<SentEmailResource> = [];
  pagedSentEmails: Array<SentEmailResource> = [];
  
  historyRecordsHeading: string = '';
  historyRecordsCount: number = 0;

  paginatorLength: number = 0;
  readonly paginatorPageSize: number = 5;
  readonly paginatorPageSizeOptions: Array<number> = [5, 10, 25, 100];

  constructor(
    private formBuilder: FormBuilder,
    private emailService: EmailService,
    private snackbar: MatSnackBar,
    private utilService: UtilService) {
    this.formGroup = this.generateForm();
    this.historyRecordsHeading = 'No matching records';
  }

  onLoadFullHistory(): void {
    this.historyRecordsHeading = 'Full history';
    this.emailService.getHistory().subscribe(
      (response: Array<SentEmailResource>) => { this.handleSucces(response); },
      (response: HttpErrorResponse) => { this.handleFailure(response); }
    );
  }

  onSubmit(): void {
    const subject = this.formGroup.controls['subject'].value || null;
    const from = this.formGroup.controls['from'].value || null;
    const to = this.formGroup.controls['to'].value || null;
    const sentSuccessfully = this.formGroup.controls['sentsuccessfully'].value;
    const confirmation = this.formGroup.controls['confirmation'].value;

    const startDate: Date = this.formGroup.controls['startDate'].value;
    const endDate: Date = this.formGroup.controls['endDate'].value;
    const zonedStartDate = this.utilService.buildDateIsoString(startDate);
    const zonedEndDate = this.utilService.buildDateIsoString(endDate);

    if (zonedStartDate && zonedEndDate) {
      this.historyRecordsHeading =
        `History between ${zonedStartDate.toLocaleDateString('en-GB')} and ${zonedEndDate.toLocaleDateString('en-GB')}`;
    }

    if (zonedStartDate && !zonedEndDate) {
      this.historyRecordsHeading =
        `History after ${zonedStartDate.toLocaleDateString('en-GB')}`;
    }

    if (!zonedStartDate && zonedEndDate) {
      this.historyRecordsHeading =
        `History before ${zonedEndDate.toLocaleDateString('en-GB')}`;
    }

    this.emailService.getHistory(subject, from, to, sentSuccessfully, confirmation, zonedStartDate, zonedEndDate).subscribe(
      (response: Array<SentEmailResource>) => { this.handleSucces(response); },
      (response: HttpErrorResponse) => { this.handleFailure(response); }
    );
  }

  onChangePage(event: PageEvent): void {
    const totalCount = this.sentEmails.length;
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;

    if (endIndex > totalCount) {
      endIndex = totalCount;
    }

    this.pagedSentEmails = this.sentEmails.slice(startIndex, endIndex);
  }

  private generateForm(): FormGroup {
    const form: FormGroup = this.formBuilder.group({});

    form.addControl('subject', new FormControl(''));
    form.addControl('from', new FormControl(''));
    form.addControl('to', new FormControl(''));
    form.addControl('sentsuccessfully', new FormControl(null));
    form.addControl('confirmation', new FormControl(null));
    form.addControl('startDate', new FormControl(null));
    form.addControl('endDate', new FormControl(null));

    return form;
  }

  private handleSucces(response: Array<SentEmailResource>): void {
    this.sentEmails = response;
    this.historyRecordsCount = this.sentEmails?.length || 0;

    /* Update pagedSentEmails and total count (paginatorLength). */
    this.pagedSentEmails = this.sentEmails.slice(0, this.paginatorPageSize);
    this.paginatorLength = this.sentEmails.length;
  }

  private handleFailure(response: HttpErrorResponse): void {
    this.snackbar.open("Error while fetching full history: " + response.error + ", " + response.message, undefined, {
      duration: 3000
    });
  }
}
