import { Component, OnInit, Input } from '@angular/core';

import { RecipientGroupResource } from 'src/models/recipient-groups/recipient-group-resource';

@Component({
  selector: 'app-recipient-groups-selector',
  templateUrl: './recipient-groups-selector.component.html',
  styleUrls: ['./recipient-groups-selector.component.scss']
})
export class RecipientGroupsSelectorComponent implements OnInit {

  @Input()
  disabled: boolean;

  constructor(
    private recipientGroupService: RecipientGroupResource) { }

  ngOnInit(): void {
  }

  onAddRecipientGroupsToRecipients(): void {
    // dialog.open()

    // dialog.afterClosed().then (
    //     if (!recipientGroups || recipientGroups.length) {
    // return;)
  }
}
