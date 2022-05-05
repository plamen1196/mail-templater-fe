import { Recipient } from '../recipient';

export interface SelectRecipientsResult {
    recipients: Array<Recipient>;
    cancelClicked: boolean;
}
