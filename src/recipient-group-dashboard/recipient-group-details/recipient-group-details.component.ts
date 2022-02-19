import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';

import { RecipientGroupResource } from 'src/models/recipient-groups/recipient-group-resource';
import { RecipientResource } from 'src/models/recipients/recipient-resource';
import { RecipientGroupService } from 'src/services/recipient-group.service';

@Component({
  selector: 'app-recipient-group-details',
  templateUrl: './recipient-group-details.component.html',
  styleUrls: ['./recipient-group-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipientGroupDetailsComponent implements OnChanges {

  @Input()
  recipientGroup: RecipientGroupResource;

  recipients: Array<RecipientResource> = [];

  constructor(private recipientGroupService: RecipientGroupService) { }

  ngOnChanges(): void {
    this.fetchRecipientsOfGroup(this.recipientGroup);
  }

  private fetchRecipientsOfGroup(recipientGroup: RecipientGroupResource) {
    if (!recipientGroup?.id) {
      return;
    }

    this.recipientGroupService.getRecipientsOfRecipientGroupById(recipientGroup.id).subscribe(
      (response: Array<RecipientResource>) => {
      this.recipients = response;
    });
  }
}
