import { IsInt, IsString } from 'class-validator';

export class StockDto {
  @IsString()
  name: string;

  @IsInt()
  price: number;

  @IsString()
  symbol: string;
}