// src/modules/mail/mail.service.ts

import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { SendMailOptions } from './dto/send-mail-options.interface';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(private readonly mailerService: MailerService) {}

  async send(options: SendMailOptions): Promise<void> {
    try {
      await this.mailerService.sendMail({
        ...options,
      });

      this.logger.log(`Email sent to: ${options.to}`);
    } catch (error) {
      this.logger.error('Email sending failed', error?.stack || error);
      throw error;
    }
  }
}