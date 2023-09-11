import axios from '@/services/axios/axois';
import { catchError } from '@/helpers/helpers';
import { Location } from '@/typings/typings';

export default async (searchStr: string) : Promise<Location[]> => {
  try {
    return (await axios.get<Location[]>('search.json', {
      params: {
        q: searchStr,
      },
    })).data;
  } catch (e) {
    return catchError(e);
  }
};
