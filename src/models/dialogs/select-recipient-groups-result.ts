import { Recipient } from '../recipient';

export interface SelectRecipientGroupResult {
    recipients: Array<Recipient>;
    cancelClicked: boolean;
}
