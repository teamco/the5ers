import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type StockDocument = HydratedDocument<Stock>;

@Schema()
export class Stock {
  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop()
  symbol: string;
}

export const StockSchema = SchemaFactory.createForClass(Stock);