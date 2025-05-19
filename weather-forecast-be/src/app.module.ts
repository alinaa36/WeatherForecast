import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppConfigModule } from './config/app-config/config.module';
import { DatabaseModule } from './database/database.module';
import { SubscriptionModule } from './modules/subscription/subscription.module';
import { WeatherModule } from './modules/weather/weather.module';
import { WeatherMailingModule } from './modules/weather-mailing/weather-mailing.module';


@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),  
      exclude: ['/api'],
    }),
    AppConfigModule,
    DatabaseModule,
    SubscriptionModule,
    WeatherModule,
    WeatherMailingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
