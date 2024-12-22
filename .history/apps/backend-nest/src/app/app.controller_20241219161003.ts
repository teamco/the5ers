import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { StockDto } from '../stocks/stock.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getData() {
    return this.appService.findAll();
  }

  @Post()
  async createStudent(@Res() response, @Body() StockDto) {
    try {
      const newStock = await this.appService.createStock(StockDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Stock has been created successfully',
        newStock,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Stock not created!',
        error: 'Bad Request'
      });
    }
  }
}
