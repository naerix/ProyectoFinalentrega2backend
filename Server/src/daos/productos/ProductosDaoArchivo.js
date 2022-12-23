import ContenedorArchivo from "../../contenedores/ContenedorArchivo.js";

class ProductosDaoArchivos extends ContenedorArchivo {
    constructor() {
        super('src/DB/productos.json')
    }
}

export default ProductosDaoArchivos;