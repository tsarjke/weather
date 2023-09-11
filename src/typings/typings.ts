export type Location = {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  id: number;
};

export type InputOption = {
  text: string;
  value: string | number;
}

export type CurrentWeather = {
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  temp_c: number;
  temp_f: number;
}

export type ForecastForDay = {
  date: string;
  date_epoch: number;
  day: {
    avgtemp_c: number;
    avgtemp_f: number;
    condition: {
      text: string;
      code: number;
    }
  }
}

export type Forecast = {
  current: CurrentWeather;
  forecast: [ForecastForDay];
  location: Location;
}
