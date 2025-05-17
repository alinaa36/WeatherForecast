import { Test, TestingModule } from '@nestjs/testing';
import { WeatherMailingService } from './services/weather-mailing.service';

describe('WeatherMailingService', () => {
  let service: WeatherMailingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeatherMailingService],
    }).compile();

    service = module.get<WeatherMailingService>(WeatherMailingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
