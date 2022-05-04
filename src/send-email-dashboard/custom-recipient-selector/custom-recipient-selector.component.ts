import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-custom-recipient-selector',
  templateUrl: './custom-recipient-selector.component.html',
  styleUrls: ['./custom-recipient-selector.component.scss']
})
export class CustomRecipientSelectorComponent implements OnInit {

  @Input()
  disabled: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
