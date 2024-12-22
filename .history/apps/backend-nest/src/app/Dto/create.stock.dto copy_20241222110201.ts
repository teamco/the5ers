import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class StockDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNumber()
  @IsNotEmpty()
  readonly price: number;

  @IsString()
  @MaxLength(3)
  @IsNotEmpty()
  readonly symbol: string;
}
