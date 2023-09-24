import axios from '@/services/axios/axois';
import { catchError } from '@/helpers';
import { Forecast } from '@/typings/typings';

export default async (value: string) :Promise<Forecast> => {
  try {
    return (await axios.get('forecast.json', {
      params: {
        q: value,
        days: '3', // maximum for free:)
      },
    })).data;
  } catch (e) {
    return catchError(e);
  }
};
