import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { StockDto } from './Dto/create.stock.dto';

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

  @Delete('/:id')
  async deleteStock(@Res() response, @Param('id') sockId: string) {
    try {
      const existingSock = await this.appService.deleteStock(sockId);
      return response.status(HttpStatus.OK).json({
        message: 'Stock has been successfully deleted',
        existingSock,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
