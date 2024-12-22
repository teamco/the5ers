import { Body, Controller, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
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
  async createStudent(@Res() response, @Body() StockDto: StockDto) {

    try {
      const newStock = await this.appService.createStock(StockDto);
      console.log(newStock);
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

  @Put('/:id')
  async updateStock(@Res() response, @Param('id') sockId: string, @Body() StockDto: StockDto) {
    try {
      const existingSock = await this.appService.updateStock(sockId, StockDto);
      return response.status(HttpStatus.OK).json({
        message: 'Stock has been successfully updated',
        existingSock,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
