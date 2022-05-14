import { environment } from './../environments/environment';

const API_URL = environment.apiUrl;

/**
 * Class that contains the API endpoints for the Email Templater Backend Service.
 */
 export class EmailTemplaterApi {
    public static readonly HOME: string = `${API_URL}/`;
    public static readonly SEND_MAILS: string = `${API_URL}/send-mails`;
    public static readonly PREVIEW_MAILS: string = `${API_URL}/preview-mails`;
    public static readonly HISTORY: string = `${API_URL}/history`;

    /* Email templates */
    public static readonly CREATE_TEMPLATE: string = `${API_URL}/templates`;
    public static readonly GET_TEMPLATES: string = `${API_URL}/templates`;
    public static readonly DELETE_TEMPLATE: string = `${API_URL}/templates/`;
    public static readonly PATCH_TEMPLATE: string = `${API_URL}/templates/`;
    public static readonly TEMPLATE_MESSAGE_MAX_LENGTH: string = `${API_URL}/templates/message-max-length`;

    /* Recipients */
    public static readonly CREATE_RECIPIENT: string = `${API_URL}/recipients`;
    public static readonly GET_RECIPIENTS: string = `${API_URL}/recipients`;
    public static readonly DELETE_RECIPIENT: string = `${API_URL}/recipients/`;
    public static readonly PATCH_RECIPIENT: string = `${API_URL}/recipients/`;

    /* Recipient groups */
    public static readonly RECIPIENT_GROUP_API: string = `${API_URL}/recipient-groups`;
    public static readonly CREATE_RECIPIENT_GROUP: string = `${API_URL}/recipient-groups`;
    public static readonly GET_RECIPIENT_GROUPS: string = `${API_URL}/recipient-groups`;
    public static readonly DELETE_RECIPIENT_GROUP: string = `${API_URL}/recipient-groups/`;
    public static readonly PATCH_RECIPIENT_GROUP: string = `${API_URL}/recipient-groups/`;
}
