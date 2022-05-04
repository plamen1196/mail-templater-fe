import { Component, OnInit, Inject, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { RecipientGroupService } from 'src/services/recipient-group.service';
import { RecipientGroupResource } from 'src/models/recipient-groups/recipient-group-resource';
import { EmailStateService } from 'src/services/email-state.service';
import { EmailTemplate } from 'src/models/templates/email-template';

@Component({
  selector: 'app-recipient-groups-list',
  templateUrl: './recipient-groups-list.component.html',
  styleUrls: ['./recipient-groups-list.component.scss']
})
export class RecipientGroupsListComponent implements OnInit, OnDestroy {

  selectedEmailTemplate: EmailTemplate | null;
  recipientGroups: Array<RecipientGroupResource> = [];
  selectedRecipientGroup: RecipientGroupResource;

  private readonly destroy$ = new Subject<void>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {},
    private dialogRef: MatDialogRef<RecipientGroupsListComponent>,
    private emailStateService: EmailStateService,
    private recipientGroupService: RecipientGroupService) { }

  ngOnInit(): void {
    this.fetchSelectedEmailTemplate();
    this.fetchRecipientGroups();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onRecipientGroupSelectionChange(event: { value: RecipientGroupResource }): void {
    this.selectedRecipientGroup = event.value;
  }

  onSubmitSelection(): void {
  }

  onCancel(): void {
  }

  private fetchSelectedEmailTemplate(): void {
    this.emailStateService.getEmailTemplate()
      .pipe(takeUntil(this.destroy$))
      .subscribe((emailTemplate: EmailTemplate | null) => {
        this.selectedEmailTemplate = emailTemplate;
      })
  }

  private fetchRecipientGroups(): void {
    this.recipientGroupService.getRecipientGroups()
    .subscribe((response: Array<RecipientGroupResource>) => {
      this.recipientGroups = response;
    });
  }
}
