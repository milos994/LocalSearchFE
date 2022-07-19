import axios, { AxiosResponse } from 'axios';
import { BASE_API } from '../../consts';
import { BusinessEntry, BusinessEntryDto } from '../../models';

const PATH = '/business-entries';
const SEARCH_PATH = '/search';

export class BusinessEntryApi {
  static get(params = {}) {
    return axios
      .get<AxiosResponse<BusinessEntryDto[]>, any>(BASE_API + PATH, { params })
      .then((data) => {
        return data.data.map((dto: BusinessEntryDto) => new BusinessEntry(dto));
      });
  }

  static search(query: string | null) {
    return axios
      .get<AxiosResponse<BusinessEntryDto[]>, any>(BASE_API + SEARCH_PATH, {
        params: { term: query },
      })
      .then((data) => {
        return data.data.map((dto: BusinessEntryDto) => new BusinessEntry(dto));
      });
  }
}
