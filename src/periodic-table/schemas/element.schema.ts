import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ElementDocument = Element & Document;

@Schema()
export class Element {
  @Prop()
  name: string;

  @Prop()
  symbol: string;

  @Prop()
  atomicNumber: number;

  @Prop()
  massNumber: number;

  @Prop()
  description?: string;

  @Prop({ required: true })
  molecularFile: string;

  @Prop()
  physicalFile?: string;
}

export const ElementSchema = SchemaFactory.createForClass(Element);