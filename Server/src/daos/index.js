import ProductosDaoArchivos from "./productos/ProductosDaoArchivo.js";
import CarritoDaoArchivos from "./carritos/CarritoDaoArchivo.js";
import ProductosDaoMemoria from "./productos/ProductosDaoMemoria.js";
import CarritoDaoMemoria from "./carritos/CarritoDaoMemoria.js";
import ProductosDaoMongoDB from "./productos/ProductosDaoMongoDB.js";
import CarritoDaoMongoDB from "./carritos/CarritoDaoMongoDB.js";
import ProductosDaoFirebase from "./productos/ProductosDaoFirebase.js";
import CarritoDaoFirebase from "./carritos/CarritoDaoFirebase.js";
import { config } from "dotenv";

config();

const instancias = [
    {
        nombre: ProductosDaoArchivos,
        id: 'archivo',
        descripcion: 'producto'
    },
    {
        nombre: CarritoDaoArchivos,
        id: 'archivo',
        descripcion: 'carrito'
    },
    {
        nombre: ProductosDaoMemoria,
        id: 'memoria',
        descripcion: 'producto'
    },
    {
        nombre: CarritoDaoMemoria,
        id: 'memoria',
        descripcion: 'carrito'
    }
    ,
    {
        nombre: ProductosDaoFirebase,
        id: 'firebase',
        descripcion: 'producto'
    },
    {
        nombre: CarritoDaoFirebase,
        id: 'firebase',
        descripcion: 'carrito'
    },
    {
        nombre: ProductosDaoMongoDB,
        id: 'mongodb',
        descripcion: 'producto'
    },
    {
        nombre: CarritoDaoMongoDB,
        id: 'mongodb',
        descripcion: 'carrito'
    }
]

const instancia = instancias.filter(i => i.id == process.env.INSTANCIA);

const resultado = {
    [instancia[0].descripcion]: instancia[0].nombre,
    [instancia[1].descripcion]: instancia[1].nombre,
}

export default resultado;
