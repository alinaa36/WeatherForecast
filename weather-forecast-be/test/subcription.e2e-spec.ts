import { AppModule } from '../src/app.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { Frequency } from 'src/modules/subscription/enum/frequency.enum';
import TestDataSource from './typeorm.config.test';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import * as request from 'supertest';
import { WeatherService } from '../src/modules/weather/services/weather.service';
import { MailService } from 'src/modules/mail/services/mail.service';

dotenv.config({ path: '.env.test' });

describe('SubscriptionController (e2e)', () => {
  let app: INestApplication;
  let token: string;

  const mockWeatherService = {
    getWeather: jest.fn().mockResolvedValue({
      temp_c: 10,
      humidity: 80,
      condition: { text: 'Sunny', icon: 'sun.png' },
      wind_kph: 15,
      wind_dir: 'N',
    }),
  };

  const mockMailService = {
    send: jest.fn().mockResolvedValue(undefined),
  };

  beforeAll(async () => {
    await TestDataSource.initialize();
    await TestDataSource.runMigrations();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ envFilePath: '.env.test', isGlobal: true }),
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: process.env.POSTGRES_HOST || 'localhost',
          port: parseInt(process.env.POSTGRES_PORT || '5436', 10),
          username: process.env.POSTGRES_USER,
          password: process.env.POSTGRES_PASSWORD,
          database: process.env.POSTGRES_DB,
          synchronize: true,
          logging: false,
          entities: ['src/**/**/*.entity.ts'],
        }),
        AppModule,
      ],
    })
      .overrideProvider(WeatherService)
      .useValue(mockWeatherService)
      .overrideProvider(WeatherService)
      .useValue(mockWeatherService)
      .overrideProvider(MailService)
      .useValue(mockMailService) 
      .compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
   
    await TestDataSource.getRepository('Subscription').clear();
  });

  function generateEmail() {
    return `test${Date.now()}@example.com`;
  }

  it('/subscribe (POST) - успішна підписка', async () => {
    const subscriptionDto = {
      email: generateEmail(),
      city: 'Kyiv',
      frequency: Frequency.HOURLY,
    };

    const response = await request(app.getHttpServer())
      .post('/api/subscribe')
      .send(subscriptionDto)
      .expect(201);

    expect(response.body).toHaveProperty('email', subscriptionDto.email);
    expect(response.body).toHaveProperty('city', subscriptionDto.city);
    expect(response.body).toHaveProperty(
      'frequency',
      subscriptionDto.frequency,
    );
    expect(response.body).toHaveProperty('confirmationToken');

    token = response.body.confirmationToken;
  });

  it('/subscribe (POST) - некоректний запит (без email)', async () => {
    const badDto = {
      city: 'Kyiv',
      frequency: 'HOURLY',
    };

    await request(app.getHttpServer())
      .post('/api/subscribe')
      .send(badDto)
      .expect(400);
  });

  it('/confirm/:token (GET) - підтвердження підписки', async () => {
    const subscriptionDto = {
      email: generateEmail(),
      city: 'Kyiv',
      frequency: Frequency.HOURLY,
    };

    const subscribeResponse = await request(app.getHttpServer())
      .post('/api/subscribe')
      .send(subscriptionDto)
      .expect(201);

    token = subscribeResponse.body.confirmationToken;

    const confirmResponse = await request(app.getHttpServer())
      .get(`/api/confirm/${token}`)
      .expect(200);

    expect(confirmResponse.body).toHaveProperty('success', true);
  });

  it('/unsubscribe/:token (GET) - відписка', async () => {
    const subscriptionDto = {
      email: generateEmail(),
      city: 'Kyiv',
      frequency: Frequency.HOURLY,
    };

    const subscribeResponse = await request(app.getHttpServer())
      .post('/api/subscribe')
      .send(subscriptionDto)
      .expect(201);

    token = subscribeResponse.body.confirmationToken;

    await request(app.getHttpServer()).get(`/api/confirm/${token}`).expect(200);

    const unsubscribeResponse = await request(app.getHttpServer())
      .get(`/api/unsubscribe/${token}`)
      .expect(200);

    expect(unsubscribeResponse.body).toHaveProperty('success', true);
  });
});
