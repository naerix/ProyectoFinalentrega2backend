
import { Schema } from "mongoose";

const ProductsCollection = "productos";

const ProductoSchema = new Schema(
  {
    name: { type: String, required: true, max: 100 },
    description: { type: String, required: true, max: 150 },
    code: { type: String, required: true, max: 10 },
    thumbnail: { type: String, required: true, max: 150 },
    price: { type: Number, required: true },
    stock: { type: Number, required: true, default: 1 },
    timestamp: { type: String, required: true, max: 100 },
  }
);

export const productModel = {ProductsCollection, ProductoSchema};