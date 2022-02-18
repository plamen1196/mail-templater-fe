import { Pipe, PipeTransform } from '@angular/core';
import { EmailTemplate } from 'src/models/templates/email-template';

@Pipe({
  name: 'searchTemplate'
})
export class SearchTemplatePipe implements PipeTransform {

  transform(value: Array<EmailTemplate>, titleSearchValue: string): Array<EmailTemplate> {
    if (!value || value === []) {
      return [];
    }

    return value.filter((emailTemplate: EmailTemplate) => emailTemplate.title.toLocaleLowerCase().includes(titleSearchValue.toLocaleLowerCase()));
  }
}
