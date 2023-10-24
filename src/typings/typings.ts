/* eslint-disable */

export type Location = {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  id: number;
  tz_id: string;
  localtime_epoch: number;
};

export type InputOption = {
  text: string;
  value: string | number;
}

type Condition = {
  code: number;
  text: string;
}

export type CurrentWeather = {
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  temp_c: number;
  temp_f: number;
  is_day: 1 | 0;
  wind_kph: number;
  precip_mm: number;
  humidity: number;
  wind_degree: number;
  condition: Condition;
}

export type ForecastForDay = {
  date_epoch: number;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    condition: Condition;
  }
}

export type CurrentWeatherData = {
  current: CurrentWeather;
  location: Location;
}

export type Forecast =
  CurrentWeatherData & {
  forecast: {
    forecastday: ForecastForDay[]
  };
}

export enum ColorTheme {
  dark = 'DARK',
  light = 'LIGHT'
}
