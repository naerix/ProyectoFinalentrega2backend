import ContenedorMongoDB from "../../contenedores/ContenedorMongoDB.js";
import { productModel } from "../../models/productModel.js";

class ProductsMongoDB extends ContenedorMongoDB {
  constructor() {
    super({
      name: productModel.ProductsCollection,
      schema: productModel.ProductoSchema,
    });
  }
}

export default ProductsMongoDB