import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Stock } from './stock.schema';
import { StockDto } from '../app/stock.dto';

@Injectable()
export class StockService {
  constructor(@InjectModel(Stock.name) private stockModel: Model<Stock>) {}

  async create(StockDto: StockDto): Promise<Stock> {
    const createdCat = new this.stockModel(StockDto);
    return createdCat.save();
  }

  async findAll(): Promise<Stock[]> {
    return this.stockModel.find().exec();
  }
}