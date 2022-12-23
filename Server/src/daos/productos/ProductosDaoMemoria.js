import ContenedorMemoria from "../../contenedores/ContenedorMemoria.js";

class ProductosDaoMemoria extends ContenedorMemoria {
    constructor() {
        super('src/DB/productos.json')
    }
}

export default ProductosDaoMemoria;