import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-recipient-groups-selector',
  templateUrl: './recipient-groups-selector.component.html',
  styleUrls: ['./recipient-groups-selector.component.scss']
})
export class RecipientGroupsSelectorComponent implements OnInit {

  @Input()
  disabled: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
