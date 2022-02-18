import { Pipe, PipeTransform } from '@angular/core';
import { RecipientResource } from 'src/models/recipients/recipient-resource';

@Pipe({
  name: 'searchRecipient'
})
export class SearchRecipientPipe implements PipeTransform {

  transform(value: Array<RecipientResource>, emailSearchValue: string): Array<RecipientResource> {
    if (!value || value === []) {
      return [];
    }

    return value.filter((recipient: RecipientResource) => recipient.email.toLocaleLowerCase().includes(emailSearchValue.toLocaleLowerCase()));
  }
}
