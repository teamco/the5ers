import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Stock } from '../stocks/stock.schema';
import { Model } from 'mongoose';
import { StockDto } from '../stocks/stock.dto';

@Injectable()
export class AppService {
  constructor(@InjectModel(Stock.name) private stockModel: Model<Stock>) { }

  async createStock(StockDto: StockDto): Promise<Stock> {
    const createdStock = new this.stockModel(StockDto);
    return createdStock.save();
  }

  async updateStock(stockId: string, StockDto: StockDto): Promise<Stock> {
    const existingStock = await this.stockModel.findByIdAndUpdate(stockId, StockDto, { new: true });
    if (!existingStock) {
      throw new NotFoundException(`Stock #${stockId} not found`);
    }
    return existingStock;
  }

  async deleteStudent(stockId: string): Promise<Stock> {
    const deletedStock = await this.stockModel.findByIdAndDelete(stockId);
   if (!deletedStock) {
     throw new NotFoundException(`Stock #${stockId} not found`);
   }
   return deletedStock;
}
}

  async findAll(): Promise<Stock[]> {
    const stocks = this.stockModel.find().exec();
    stocks.then((res) => console.log(res));
    return stocks;
  }
}
