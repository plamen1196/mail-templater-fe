import { Pipe, PipeTransform } from '@angular/core';
import { RecipientGroupResource } from 'src/models/recipient-groups/recipient-group-resource';

@Pipe({
  name: 'searchRecipientGroup'
})
export class SearchRecipientGroupPipe implements PipeTransform {

  transform(value: Array<RecipientGroupResource>, titleSearchValue: string): Array<RecipientGroupResource> {
    if (!value || value === []) {
      return [];
    }

    return value.filter((recipientGroup: RecipientGroupResource) =>
      recipientGroup.title.toLocaleLowerCase().includes(titleSearchValue.toLocaleLowerCase()));
  }
}
