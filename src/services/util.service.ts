import { Injectable } from '@angular/core';
import { RecipientResource } from 'src/models/recipients/recipient-resource';
import { Recipient } from 'src/models/recipient';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  private readonly SIXTY_SECONDS_IN_MILLIS = 60000;
  private readonly MISSING_FIRST_FIELD_IN_TSV_ROW = '<missing first field>';

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

  buildArrayFromCommaSeparatedString(val: string): Array<number> {
    if (!val) {
      return [];
    }

    return val.split(',').map(singleValue => parseInt(singleValue, 10));
  }

  buildDateIsoString(date: Date): Date | undefined {
    if (!date) {
      return undefined;
    }

    return new Date(date.getTime() - date.getTimezoneOffset() * this.SIXTY_SECONDS_IN_MILLIS);
  }

  buildRecipientsTsvData(recipients: Array<RecipientResource>, placeholders: Array<string> | undefined): string {
    if (!recipients || !recipients.length) {
      return '';
    }

    let recipientsTsvData = '';

    for (const recipient of recipients) {
      const recipientRawFields = [recipient.email].concat(placeholders || []);
      const recipientTsvData = recipientRawFields.join('\t');

      recipientsTsvData += (recipientTsvData + '\n');
    }

    return recipientsTsvData;
  }

  buildRecipients(recipientsTsvData: string, placeholders: Array<string> | undefined): Array<Recipient> {
    if (!recipientsTsvData) {
      return [];
    }

    const recipientsRows = recipientsTsvData.split("\n");

    if (!recipientsRows?.length) {
      return [];
    }
    
    const recipients = [];

    for (const recipientRow of recipientsRows) {
      const recipientFields = recipientRow.split("\t");
      /* Email must be first. */
      const recipientEmail = recipientFields.shift() || this.MISSING_FIRST_FIELD_IN_TSV_ROW;

      if (recipientEmail === this.MISSING_FIRST_FIELD_IN_TSV_ROW) {
        continue;
      }

      const recipient = new Recipient();
      recipient.email = recipientEmail;

      /* If the placeholder fields are present, build a placeholder map for the recipient. */
      if (recipientFields.length) {
        let recipientFieldIndex = 0;
        recipient.placeholders = new Map();
  
        for (const placeholder of placeholders || []) {
          recipient.placeholders.set(placeholder, recipientFields[recipientFieldIndex]);
          recipientFieldIndex++;
        }
      }

      recipients.push(recipient);
    }

    return recipients;
  }
}
