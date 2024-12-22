import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Stock } from '../stocks/stock.schema';
import { Model } from 'mongoose';
import { StockDto } from '../stocks/stock.dto';

@Injectable()
export class AppService {
  constructor(@InjectModel(Stock.name) private stockModel: Model<Stock>) {}
  
    async createStock(StockDto): Promise<Stock> {
      const createdStock = new this.stockModel(StockDto);
      return createdStock.save();
    }
  
    async findAll(): Promise<Stock[]> {
      const stocks = this.stockModel.find().exec();
      stocks.then((res) => console.log(res));
      return stocks;
    }
}