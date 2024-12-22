import { Document } from 'mongoose';

export interface IStock extends Document {
  readonly name: string;
  readonly price: number;
  readonly symbol: string;
}