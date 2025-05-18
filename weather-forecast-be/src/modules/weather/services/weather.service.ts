import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios from "axios";

interface WeatherData {
  temp_c: number;
  humidity: number;
  condition: {
    text: string;
    icon: string;
  };
  wind_kph: number;
  wind_dir: string;
}

interface WeatherResponse {
  current: WeatherData;
  location: {
    name: string;
    country: string;
  };
}

@Injectable()
export class WeatherService {
  private apiKey: string;
  private apiBaseUrl: string;
  constructor(private readonly configServise: ConfigService) {
    this.apiKey = this.configServise.get<string>('WEATHER_API_KEY')!;
    this.apiBaseUrl = this.configServise.get<string>('WEATHER_URL')!;
  }

  async getWeather(city: string): Promise<WeatherData | null> {
    try {
      const response = await axios.get<WeatherResponse>(
        `${this.apiBaseUrl}/current.json`,
        {
          params: {
            key: this.apiKey,
            q: city,
          },
        },
      );

      return response.data.current;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
