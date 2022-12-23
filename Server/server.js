import express from 'express';
import instancia from './src/daos/index.js';
import cors from "cors"

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const { Router } = express;
const routerProductos = Router();
const routerCarrito = Router();
// const Container = require("./src/contenedores/ContenedorArchivo.js");
// const Carrito = require("./classCarrito.js");
const app = express();
const port = process.env.PORT || 8080;
// const cors = require("cors")


const producto = new instancia.producto;
const carrito = new instancia.carrito;




// const contenedor = new Container();
// const carrito = new Carrito();

app.use(function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  next();
});

app.use(cors({
  origin : "*",
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(port, () => {
  console.log(`App funcionando en http://localhost:${port}`);
});

app.use("/api/productos", routerProductos);
app.use("/api/carrito", routerCarrito);

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.send(
      "<h1 style='color:blue;'> E-commerce </h1><a href='/form'> Subir producto </a>"
  );
});
app.get("/form", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});



let isAdmin = true;

routerProductos.get("/", async (req, res) => {
  try {
    const productos = await producto.getAll();
    res.json(productos);
  } catch (error) {
    res.json({ error: true, msj: "error" });
  }
});

routerProductos.get("/:id", async (req, res) => {
  const id = req.params.id;
  res.json((await producto.getById(id)) ?? { error: "no encontrado" });
});

routerProductos.post(
  "/",
  async (req, res, next) => {
    if (isAdmin === true) {
      next();
    } else {
      return res
        .status(401)
        .json({ error: -1, descripcion: "ruta 'x' método 'y' no autorizada" });
    }
  },
  async (req, res) => {
    try {
      const { body } = req;
      body.timestamp = Date.now();
      producto.save(body);
      // res.json("ok");
    } catch (error) {
      res.json({ error: true, msj: "error" });
    }
  }
);

routerProductos.put(
  "/:id",
  async (req, res, next) => {
    if (isAdmin === true) {
      next();
    } else {
      return res
        .status(401)
        .json({ error: -1, descripcion: "ruta 'x' método 'y' no autorizada" });
    }
  },
  async (req, res) => {
    try {
      const { id } = req.params;
      const { name, price } = req.body;
      console.log(name, price, id);
      await producto.updateById(id, name, price);
      res.json({ succes: true });
    } catch (error) {
      res.json({ error: true, msj: "error" });
    }
  }
);

routerProductos.delete(
  "/:id",
  async (req, res, next) => {
    if (isAdmin === true) {
      next();
    } else {
      return res
        .status(401)
        .json({ error: -1, descripcion: "ruta 'x' método 'y' no autorizada" });
    }
  },
  async (req, res) => {
    try {
      const id = req.params.id;
      producto.deleteById(id);
      res.send("Eliminado");
    } catch (error) {
      res.json({ error: true, msj: "error" });
    }
  }
);


routerCarrito.post("/", async (req, res) => {
  res.json((await carrito.newCart()) ?? { error: "no encontrado" });
});

routerCarrito.post("/:id/productos/:id_prod", async (req, res) => {

  try {
  const idCart = req.params.id;
  const idProd = req.params.id_prod;
  let timestamp = Date.now();
  carrito.postById(idCart, idProd, timestamp)
  } catch (error) {
    console.log(error)
    res.json({ error: true, msj: `${error}` });
  }
});


routerCarrito.get("/:id/productos/", async (req, res) => {
  try {
    const { id } = await req.params;
    const prodCarrito = await carrito.getAll(id)
      console.log(id+ " try")
      await res.json(prodCarrito);

  } catch (error) {
    console.log(error)
    res.json({ error: true, msj: `${error}` });
  }
});

routerCarrito.delete("/:id/productos/:id_prod", async (req, res) => {
  try {
    const { id } = req.params;
    const { id_prod } = req.params;

      productos = await carrito.deleteProduct(id,id_prod)
      res.json(productos);

  } catch (error) {
    res.json({ error: true, msj: "error" });
  }
});

routerCarrito.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

      await carrito.deleteCart(id)
      res.json({succes: true});

  } catch (error) {
    res.json({ error: true, msj: "error" });
  }
});


