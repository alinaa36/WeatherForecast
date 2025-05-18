import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from '../services/weather.service';
import { WeatherData } from 'src/modules/weather/interfaces/weather-data.interface';

@Controller('api')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get('weather')
  async findWeather(@Query('city') city: string): Promise<WeatherData | null> {
    return await this.weatherService.getWeather(city);
  }
}
