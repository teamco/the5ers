import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
import { Stock, StockSchema } from './schema/stock.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/interview'),
    MongooseModule.forFeature([{ name: Stock.name, schema: StockSchema }])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
