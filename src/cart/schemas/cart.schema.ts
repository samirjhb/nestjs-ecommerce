import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { Item } from './item.schema';

export type CartDocument = Cart & Document;

@Schema()
export class Cart {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  userId: string;

  @Prop()
  items: Item[];

  @Prop()
  totalPrice: number; 
}

export const CartSchema = SchemaFactory.createForClass(Cart);

//Aquí, utilizamos la misma técnica para la propiedad userId que obtendrá como valor el ID del usuario.
//Para la propiedad items utilizamos nuestro esquema Item para definir una matriz de elementos con tipo de Item.
