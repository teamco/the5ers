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
// console.log(@Body())
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

  // @Put('/:id')
  // async updateStudent(@Res() response, @Param('id') studentId: string,
  //   @Body() updateStudentDto: UpdateStudentDto) {
  //   try {
  //     const existingStudent = await this.studentService.updateStudent(studentId, updateStudentDto);
  //     return response.status(HttpStatus.OK).json({
  //       message: 'Student has been successfully updated',
  //       existingStudent,
  //     });
  //   } catch (err) {
  //     return response.status(err.status).json(err.response);
  //   }
  // }
}
