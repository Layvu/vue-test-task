import type { CityInfo } from './common';

export interface WeatherResult {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
  dt_txt: string;
  wind: {
    speed: number;
  };
  name: string;
}

export interface WeatherResponse {
  list: WeatherResult[];
}

export interface ForecastResponse {
  cod: string;
  cnt: number;
  list: WeatherResult[];
  city: CityInfo;
}
