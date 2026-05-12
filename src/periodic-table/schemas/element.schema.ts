import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ElementDocument = Element & Document;

@Schema({ timestamps: true })
export class Element {

  @Prop({ required: true })
  model_name: string;

  @Prop({ required: true })
  model_annotation: string;

  @Prop({ required: true })
  file1: string;

  @Prop()
  file2?: string;

  @Prop()
  content?: string;

  @Prop([
    {
      key: { type: String },
      value: { type: String },
    },
  ])
  properties: {
    key: string;
    value: string;
  }[];
}

export const ElementSchema = SchemaFactory.createForClass(Element);