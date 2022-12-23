import ContenedorMongoDB from "../../contenedores/ContenedorMongoDB.js";
import { cartModel } from "../../models/cartModel.js";
import ProductsMongoDB from "../productos/ProductosDaoMongoDB.js";

class CarritoDaoMongoDB extends ContenedorMongoDB {
    constructor() {
        super({
            name: cartModel.CartCollection,
            schema: cartModel.CarritoSchema,
          })
    }

    

    postById = async (idCart, idProd, timestamp) => {
    try {
        const producto = new ProductsMongoDB.getById(idProd)

        const carrito = await this.model.find({carrito_id: idCart});

        carrito.timestamp = timestamp
        carrito.productos.push(producto);

        super.updateById(idCart, carrito);

    } catch (e) {
        console.log(e);
    }
    };

    deleteProduct = async (idCart, prodId) => {
    ///////////////////
    try {
        const carrito = await this.model.find({carrito_id: idCart});

        if (!carrito) {
        console.log("El carrito no existe");
        } else {
        const indexProd = await carrito.productos.findIndex(
            (obj) => obj.id == prodId
        );
        if (indexProd >= 0) {
            await carrito.productos.splice(indexProd, 1);
        }
        }

        super.updateById(idCart, carrito);


    } catch (e) {
        console.log(e);
    }
    };

}

export default CarritoDaoMongoDB;