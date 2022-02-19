import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRecipientPipe } from './search-recipient.pipe';
import { SearchTemplatePipe } from './search-template.pipe';
import { SearchRecipientGroupPipe } from './search-recipient-group.pipe';

@NgModule({
  declarations: [
    SearchRecipientPipe,
    SearchTemplatePipe,
    SearchRecipientGroupPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SearchRecipientPipe,
    SearchTemplatePipe,
    SearchRecipientGroupPipe
  ]
})
export class UtilModule { }
