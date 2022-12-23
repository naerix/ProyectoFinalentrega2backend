

import { Schema } from "mongoose";

const CartCollection = "carrito";

const CarritoSchema = new Schema(
  {
    carrito_id: { type: Number, required: false },
    timestamp: { type: String, required: true, max: 100 },
    products: [{ type: Schema.Types.ObjectId, ref: "products" }],
  }
);

export const cartModel = { CartCollection, CarritoSchema };