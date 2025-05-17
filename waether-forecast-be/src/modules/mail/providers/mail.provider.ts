import { Provider } from '@nestjs/common';
import { AppMailerService } from '../services/app-mailer.service';

export const provider: Provider = {
  provide: 'MAIL_PROVIDER',
  useClass: AppMailerService,
};
