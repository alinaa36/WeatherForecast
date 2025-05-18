import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config/app-config/config.module';
import { DatabaseModule } from './database/database.module';
import { SubscriptionModule } from './modules/subscription/subscription.module';
import { WeatherModule } from './modules/weather/weather.module';
import { WeatherMailingModule } from './modules/weather-mailing/weather-mailing.module';
import { MailModule } from './modules/mail/mail.module';

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    SubscriptionModule,
    WeatherModule,
    WeatherMailingModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
