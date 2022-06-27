import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

export type ItemDocument = Item & Document;

@Schema()
export class Item {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Product' })
  productId: string;

  @Prop()
  name: string;

  @Prop()
  quantity: number;

  @Prop()
  price: number;

  @Prop()
  subTotalPrice: number; 
}

export const ItemSchema = SchemaFactory.createForClass(Item);

// En el código anterior, en el decorador @Prop de la propiedad productId, 
// definimos un tipo de esquema de ID de objeto y añadimos una referencia al producto.
//  Esto significa que utilizaremos el ID del producto para el valor productId.