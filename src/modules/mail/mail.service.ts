import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) { }

    async sendMail(to: string, subject: string, html: string, attachments?: any[]) {
        await this.mailerService.sendMail({
            to,
            subject,
            html,
            attachments,
        });
    }
}
