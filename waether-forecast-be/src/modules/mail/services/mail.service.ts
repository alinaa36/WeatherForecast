import { Inject, Injectable } from '@nestjs/common';
import { EmailSettings } from 'src/modules/mail/interfaces/email-settings.interface';
import { IProviderService } from '../interfaces/provider.interface';

@Injectable()
export class MailService {
  constructor(
    @Inject('MAIL_PROVIDER') private mailerService: IProviderService,
  ) {}

  async send(settings: EmailSettings): Promise<void> {
    await this.mailerService.sendEmail(settings);
  }
}
