import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-recipient-selector',
  templateUrl: './recipient-selector.component.html',
  styleUrls: ['./recipient-selector.component.scss']
})
export class RecipientSelectorComponent implements OnInit {

  @Input()
  disabled: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
