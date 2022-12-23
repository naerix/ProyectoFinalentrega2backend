import { promises as fs } from "fs";

class ContenedorMemoria {
  constructor() {
    this.productos = [{"name":"Remera","price":3000,"id":1,"thumbnail":"https://newsport.vteximg.com.br/arquivos/ids/14017559-455-588/VLL2151-A.jpg","description":"loremipsum dolor sit amet, consectetur adipiscing"},{"name":"Pantalon","price":6000,"id":2,"thumbnail":"https://www.cheeky.com.ar/uploads/picture/image/124121/V2300101_40_1.jpg","description":"loremipsum dolor sit amet, consectetur adipiscing"},{"name":"Buzo","price":7500,"id":4,"thumbnail":"https://topperarg.vtexassets.com/arquivos/ids/257590-800-800?width=800&height=800&aspect=true","description":"loremipsum dolor sit amet, consectetur adipiscing"},{"name":"Pañuelo rojo","price":1300,"id":5,"thumbnail":"https://http2.mlstatic.com/D_NQ_NP_604426-MLA43655135531_102020-O.webp","description":"loremipsum dolor sit amet, consectetur adipiscing"},{"name":"Bermuda","price":2000,"thumbnail":"https://www.panareha.com/772-large_default/bermuda-turtle-bh1801g02.jpg","id":6,"description":"loremipsum dolor sit amet, consectetur adipiscing"},{"name":"Gorro azul","price":4000,"thumbnail":"https://http2.mlstatic.com/D_NQ_NP_605965-MLA44164688536_112020-O.webp","id":7,"description":"loremipsum dolor sit amet, consectetur adipiscing"},{"name":"Chaleco verde","price":15000,"thumbnail":"https://http2.mlstatic.com/D_NQ_NP_632594-MLA49682725306_042022-O.webp","id":8,"description":"loremipsum dolor sit amet, consectetur adipiscing"}]; 
  }

  getAll = async (id) => {
    try {
      if (id) {
        console.log(this.DB)
        
        return await this.DB[1];

      } else {
        // const productos = JSON.parse(this.productos);
        return this.productos;
      }
    } catch (e) {
      console.log(e);
    }
  };

  save = async (producto) => {
    try {
      const productos = await this.productos.getAll();
      const ids = productos.map((object) => {
        return object.id;
      });

      const max = Math.max(...ids);
      console.log(max);

      const id = max + 1;
      producto.id = id;
      this.archive.push(producto);


    } catch (e) {
      console.log(e);
    }
  };
  getById = async (id) => {
    try {

      const newData = JSON.parse(this.productos);
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
      const readData = await fs.readFile(this.productos);
      const newData = JSON.parse(readData);
      const name = newData.find((name) => name.id == id);
      if (!name) {
        console.log("ID no existe");
      } else {
        const filteredData = newData.filter((e) => e.id != id);
        const dataJSON = JSON.stringify(filteredData);
        await fs.writeFile(this.productos, dataJSON);

        console.log("Producto eliminado");
      }
    } catch (e) {
      console.log(e);
    }
  };




  
  updateById = async (id, name, price) => {
    try {
      const productos = await this.productos.getAll();
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
      this.productos = []
      console.log("Productos eliminados");
      
    } catch (e) {
      console.log(e);
    }
  };
}

export default ContenedorMemoria;
