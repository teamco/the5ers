import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStockDto } from './Dto/create.stock.dto';
import { UpdateStockDto } from './Dto/update.stock.dto';
import { IStock } from './stock.interface';

@Injectable()
export class AppService {
  constructor(@InjectModel('Stock') private stockModel: Model<IStock>) { }

  /**
   * Creates a new stock record in the database.
   * @param CreateStockDto - The data transfer object containing the details of the stock to be created.
   * @returns A promise that resolves to the newly created stock.
   */
  async createStock(CreateStockDto: CreateStockDto): Promise<IStock> {
    const createdStock = new this.stockModel(CreateStockDto);
    return createdStock.save();
  }

  /**
   * Updates a stock with the given id
   * @param stockId the id of the stock to update
   * @param UpdateStockDto the new data to update the stock with
   * @returns the updated stock
   * @throws NotFoundException if a stock with the given id is not found
   */
  async updateStock(stockId: string, UpdateStockDto: UpdateStockDto): Promise<IStock> {
    const existingStock = await this.stockModel.findByIdAndUpdate(stockId, UpdateStockDto, { new: true });
    if (existingStock) {
      return existingStock;
    }

    throw new NotFoundException(`Stock #${stockId} not found`);
  }

  /**
   * Fetches a stock record by its id from the database.
   * @param stockId the id of the stock to fetch
   * @returns a promise that resolves to the requested stock
   * @throws NotFoundException if a stock with the given id is not found
   */
  async getStock(stockId: string): Promise<IStock> {
    const existingStock = await this.stockModel.findById(stockId).exec();
    if (existingStock) {
      return existingStock;
    }

    throw new NotFoundException(`Stock #${stockId} not found`);
  }

  async deleteStock(stockId: string): Promise<IStock> {
    const deletedStock = await this.stockModel.findByIdAndDelete(stockId);
    if (!deletedStock) {
      throw new NotFoundException(`Stock #${stockId} not found`);
    }
    return deletedStock;
  }

  /**
   * Retrieves all stock records from the database.
   * @returns A promise that resolves to an array of all stock records.
   */
  async findAll(): Promise<IStock[]> {
    const stocks = this.stockModel.find().exec();
    stocks.then((res) => console.log(res));
    return stocks;
  }
}
