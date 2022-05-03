import { EmailTemplate } from '../templates/email-template';

export interface SelectTemplateResult {
    selectedTemplate: EmailTemplate;
    cancelClicked: boolean;
}
