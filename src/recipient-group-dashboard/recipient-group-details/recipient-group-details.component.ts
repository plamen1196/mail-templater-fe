import { Component, Input } from '@angular/core';

import { RecipientGroupResource } from 'src/models/recipient-groups/recipient-group-resource';
import { RecipientResource } from 'src/models/recipients/recipient-resource';
import { RecipientGroupService } from 'src/services/recipient-group.service';

@Component({
  selector: 'app-recipient-group-details',
  templateUrl: './recipient-group-details.component.html',
  styleUrls: ['./recipient-group-details.component.scss']
})
export class RecipientGroupDetailsComponent {

  private _recipientGroup: RecipientGroupResource;

  @Input()
  get recipientGroup(): RecipientGroupResource {
    return this._recipientGroup;
  }

  set recipientGroup(value: RecipientGroupResource) {
    this._recipientGroup = value;
    this.fetchRecipientsOfGroup(this.recipientGroup);
  }

  recipients: Array<RecipientResource> = [];

  constructor(private recipientGroupService: RecipientGroupService) { }

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
