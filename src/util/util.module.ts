import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRecipientPipe } from './search-recipient.pipe';
import { SearchTemplatePipe } from './search-template.pipe';

@NgModule({
  declarations: [
    SearchRecipientPipe,
    SearchTemplatePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SearchRecipientPipe,
    SearchTemplatePipe
  ]
})
export class UtilModule { }
