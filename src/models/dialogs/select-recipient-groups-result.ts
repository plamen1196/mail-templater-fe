import { RecipientGroupResource } from '../recipient-groups/recipient-group-resource';

export interface SelectRecipientGroupsResult {
    selectedRecipientGroups: Array<RecipientGroupResource>;
    cancelClicked: boolean;
}
