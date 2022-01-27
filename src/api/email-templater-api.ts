/**
 * Class that contains the API endpoints for the Email Templater Backend Service.
 */
 export class EmailTemplaterApi {
    public static readonly HOME: string = 'http://localhost:8080/';
    public static readonly HISTORY: string = 'http://localhost:8080/history';
    public static readonly SEND_MAILS: string = 'http://localhost:8080/send-mails';
    public static readonly PREVIEW_MAILS: string = 'http://localhost:8080/preview-mails';

    /* CRUD */
    public static readonly ADD_TEMPLATE: string = 'http://localhost:8080/templates';
    public static readonly FETCH_TEMPLATES: string = 'http://localhost:8080/templates';
    public static readonly DELETE_TEMPLATE: string = 'http://localhost:8080/templates/';
    public static readonly EDIT_TEMPLATE: string = 'http://localhost:8080/templates/';
}
