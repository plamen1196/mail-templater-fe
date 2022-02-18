/**
 * Class that contains the API endpoints for the Email Templater Backend Service.
 */
 export class EmailTemplaterApi {
    public static readonly HOME: string = 'http://localhost:8080/';
    public static readonly HISTORY: string = 'http://localhost:8080/history';
    public static readonly SEND_MAILS: string = 'http://localhost:8080/send-mails';
    public static readonly PREVIEW_MAILS: string = 'http://localhost:8080/preview-mails';

    /* Email templates */
    public static readonly CREATE_TEMPLATE: string = 'http://localhost:8080/templates';
    public static readonly GET_TEMPLATES: string = 'http://localhost:8080/templates';
    public static readonly DELETE_TEMPLATE: string = 'http://localhost:8080/templates/';
    public static readonly PATCH_TEMPLATE: string = 'http://localhost:8080/templates/';

    /* Recipients */
    public static readonly CREATE_RECIPIENT: string = 'http://localhost:8080/recipients';
    public static readonly GET_RECIPIENT: string = 'http://localhost:8080/recipients';
    public static readonly DELETE_RECIPIENT: string = 'http://localhost:8080/recipients/';
    public static readonly PATCH_RECIPIENT: string = 'http://localhost:8080/recipients/';

    /* Recipient groups */
    public static readonly RECIPIENT_GROUP_API: string = 'http://localhost:8080/recipient-groups';
    public static readonly CREATE_RECIPIENT_GROUP: string = 'http://localhost:8080/recipient-groups';
    public static readonly GET_RECIPIENT_GROUPS: string = 'http://localhost:8080/recipient-groups';
    public static readonly DELETE_RECIPIENT_GROUP: string = 'http://localhost:8080/recipient-groups/';
    public static readonly PATCH_RECIPIENT_GROUP: string = 'http://localhost:8080/recipient-groups/';
}
