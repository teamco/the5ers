import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateStockDto } from './Dto/create.stock.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getData() {
    return this.appService.findAll();
  }

  @Post()
  async createStock(@Res() response, @Body() CreateStockDto: CreateStockDto) {
console.log(123,response)
    try {
      const newStock = await this.appService.createStock(CreateStockDto);

      return response.status(HttpStatus.CREATED).json({
        message: 'Stock has been created successfully',
        newStock,
      });

    } catch (err) {

      console.warn(err);
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Stock not created!',
        error: 'Bad Request'
      });
    }
  }

  @Put('/:id')
  async updateStock(@Res() response, @Param('id') sockId: string, @Body() CreateStockDto: CreateStockDto) {
    try {
      const existingSock = await this.appService.updateStock(sockId, CreateStockDto);
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
