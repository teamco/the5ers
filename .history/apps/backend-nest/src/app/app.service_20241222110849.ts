import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Stock } from './schema/stock.schema';
import { Model } from 'mongoose';
import { CreateStockDto } from './Dto/create.stock.dto';
import { UpdateStockDto } from './Dto/update.stock.dto';
import { IStock } from './stock.interface';

@Injectable()
export class AppService {
  constructor(@InjectModel('Stock') private stockModel: Model<IStock>) { }

  async createStock(CreateStockDto: CreateStockDto): Promise<Stock> {
    const createdStock = new this.stockModel(CreateStockDto);
    return createdStock.save();
  }

  async updateStock(stockId: string, UpdateStockDto: UpdateStockDto): Promise<Stock> {
    const existingStock = await this.stockModel.findByIdAndUpdate(stockId, UpdateStockDto, { new: true });
    if (!existingStock) {
      throw new NotFoundException(`Stock #${stockId} not found`);
    }
    return existingStock;
  }

  async deleteStock(stockId: string): Promise<Stock> {
    const deletedStock = await this.stockModel.findByIdAndDelete(stockId);
    if (!deletedStock) {
      throw new NotFoundException(`Stock #${stockId} not found`);
    }
    return deletedStock;
  }

  async findAll(): Promise<Stock[]> {
    const stocks = this.stockModel.find().exec();
    stocks.then((res) => console.log(res));
    return stocks;
  }
}
