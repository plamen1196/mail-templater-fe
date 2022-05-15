export class SentEmailResource {
    id: number;
    subject: string;
    message: string;
    senderEmail: string;
    recipientEmail: string;
    sentSuccessfully: boolean;
    timestamp: Date;
    confirmation: number;
}
