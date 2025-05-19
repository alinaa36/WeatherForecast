import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { WeatherService } from '../src/modules/weather/services/weather.service';

jest.setTimeout(30000);

describe('WeatherController (e2e)', () => {
  let app: INestApplication;

  const mockWeatherService = {
    getWeather: jest.fn().mockResolvedValue({
      temp_c: 10,
      humidity: 80,
      condition: { text: 'Sunny', icon: 'sun.png' },
      wind_kph: 15,
      wind_dir: 'N',
    }),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(WeatherService)
      .useValue(mockWeatherService)
      .compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    await app.init();
  });

  afterAll(async () => {
    if (app) await app.close();
  });

  it('GET /api/weather?city=Kyiv → returns mocked weather data', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/weather?city=Kyiv')
      .expect(200);

    expect(response.body).toEqual({
      temp_c: 10,
      humidity: 80,
      condition: { text: 'Sunny', icon: 'sun.png' },
      wind_kph: 15,
      wind_dir: 'N',
    });
  });

  it('GET /api/weather without city → returns null', async () => {
    mockWeatherService.getWeather.mockResolvedValueOnce(null);

    const response = await request(app.getHttpServer())
      .get('/api/weather')
      .expect(400);

    expect(response.body).toEqual({
      statusCode: 400,
      message: 'City parameter is required',
      error: 'Bad Request',
    });
  });
});
