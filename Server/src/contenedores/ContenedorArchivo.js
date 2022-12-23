import { promises as fs } from "fs";

class ContenedorArchivo {
  constructor(ruta) {
    this.ruta = ruta;
  }

  getAll = async (id) => {
    try {
      if (id) {
        console.log(this.ruta);
        const archive = await fs.readFile(this.ruta, "utf-8");

        const newDataCart = JSON.parse(archive);

        const cart = await newDataCart.find((prod) => prod.carrito_id == id);

        return cart;

      } else {
        const archive = await fs.readFile(this.ruta, "utf-8");
        const productos = JSON.parse(archive);
        console.log("aca no");
        return productos;
      }
    } catch (e) {
      console.log(e);
    }
  };

  save = async (producto) => {
    try {
      const productos = await this.getAll();
      const ids = productos.map((object) => {
        return object.id;
      });

      const max = Math.max(...ids);
      console.log(max);

      const id = max + 1;
      producto.id = id;
      productos.push(producto);

      const productsString = JSON.stringify(productos);

      await fs.writeFile(this.ruta, productsString);
    } catch (e) {
      console.log(e);
    }
  };
  getById = async (id) => {
    try {
      const readData = await fs.readFile(this.ruta);
      const newData = JSON.parse(readData);
      const name = newData.find((name) => name.id == id);
      if (name) {
        return name;
      } else {
        console.log("Producto no encontrado");
      }
    } catch (error) {
      console.log(error);
    }
  };

  deleteById = async (id) => {
    try {
      const readData = await fs.readFile(this.ruta);
      const newData = JSON.parse(readData);
      const name = newData.find((name) => name.id == id);
      if (!name) {
        console.log("ID no existe");
      } else {
        const filteredData = newData.filter((e) => e.id != id);
        const dataJSON = JSON.stringify(filteredData);
        await fs.writeFile(this.ruta, dataJSON);

        console.log("Producto eliminado");
      }
    } catch (e) {
      console.log(e);
    }
  };




  
  updateById = async (id, name, price) => {
    try {
      const productos = await this.getAll();
      const item = productos.find((prod) => prod.id === Number(id));
      if (item) {
        item.name = name;
        item.price = price;
        const dataJSON = JSON.stringify(productos);
        await fs.writeFile(this.ruta, dataJSON);
        return item;
      } else {
        return { error: "Producto no encontrado" };
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  deleteAll = async () => {
    try {
      await fs.writeFile(this.ruta, JSON.stringify([]));
      console.log("Productos eliminados");
    } catch (e) {
      console.log(e);
    }
  };
}

export default ContenedorArchivo;
