import { Injectable } from '@angular/core';
import { RecipientResource } from 'src/models/recipients/recipient-resource';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  extractPlaceholders(message: string): Array<string> {
    /* Get all substrings starting with "%(" and ending with ")" */
    let regexResult = message.match(/%\(.*?\)/gm);

    if (regexResult == null || regexResult.length === 0) {
      return [];
    }

    /* Remove the starting "%(" and ending ")" strings */
    regexResult = regexResult.map(regexResultEntry => regexResultEntry.substring(2, regexResultEntry.length - 1));

    /* Remove duplicated placeholders */
    regexResult =  Array.from(new Set(regexResult));

    return regexResult;
  }

  getRecipientResourcesFromIds(recipientResources: Array<RecipientResource>, recipientIds: Array<number>) {
    if (!recipientResources?.length || !recipientIds?.length) {
      return [];
    }

    return recipientResources.filter((recipient: RecipientResource) => recipientIds.includes(recipient.id));
  }

  buildCommaSeparatedString(arr: Array<number>) {
    if (!arr?.length) {
      return '';
    }

    return arr.join(',');
  }
}
