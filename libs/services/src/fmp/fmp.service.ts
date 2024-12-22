import axios, { AxiosInstance } from 'axios';
import { GetQuoteResponse, StockListItem } from './fmp.types';

const FMP_API_KEY = 'AMwWW9RMCg9kJykTCBjzyB0AfYmrGUzx'
const FMP_BASE_URL = 'https://financialmodelingprep.com/api/v3'

export class FmpClient {
  private client: AxiosInstance;
  constructor() {
    this.client = axios.create({
      baseURL: FMP_BASE_URL,
      params: {
        apikey: FMP_API_KEY,
      },
    });
  }
  public async getQuote(quote: string): Promise<GetQuoteResponse> {
    return await this.client.get(`/quote/${quote}`).then((res) => res.data);
  }

  public async getStockList(): Promise<StockListItem[]> {
    return await this.client.get('/stock/list');
  }
}
