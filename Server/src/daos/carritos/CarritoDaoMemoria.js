import ContenedorMemoria from "../../contenedores/ContenedorMemoria.js";
// import { promises as fs } from "fs";

class CarritoDaoMemoria extends ContenedorMemoria {
  constructor() {
    super("src/DB/carrito.json");
    this.DB = [
      {
        carrito_id: 1,
        productos: [
          {
            name: "Remera",
            price: 3000,
            id: 1,
            thumbnail:
              "https://newsport.vteximg.com.br/arquivos/ids/14017559-455-588/VLL2151-A.jpg",
            description: "loremipsum dolor sit amet, consectetur adipiscing",
            timestamp: 1669315741468,
          },
        ],
      },
      {
        carrito_id: 2,
        productos: [
          {
            name: "Remera",
            price: 3000,
            id: 1,
            thumbnail:
              "https://newsport.vteximg.com.br/arquivos/ids/14017559-455-588/VLL2151-A.jpg",
            description: "loremipsum dolor sit amet, consectetur adipiscing",
            timestamp: 1669315741468,
          },
          {
            name: "Pañuelo rojo",
            price: 1300,
            id: 5,
            thumbnail:
              "https://http2.mlstatic.com/D_NQ_NP_604426-MLA43655135531_102020-O.webp",
            description: "loremipsum dolor sit amet, consectetur adipiscing",
            timestamp: 1669315771498,
          },
          {
            name: "Buzo",
            price: 7500,
            id: 4,
            thumbnail:
              "https://topperarg.vtexassets.com/arquivos/ids/257590-800-800?width=800&height=800&aspect=true",
            description: "loremipsum dolor sit amet, consectetur adipiscing",
            timestamp: 1669315774329,
          },
          {
            name: "Chaleco verde",
            price: 15000,
            thumbnail:
              "https://http2.mlstatic.com/D_NQ_NP_632594-MLA49682725306_042022-O.webp",
            id: 8,
            description: "loremipsum dolor sit amet, consectetur adipiscing",
            timestamp: 1671543875826,
          },
        ],
      },
    ];
  }

  newCart = async () => {
    try {
      const archive = this.DB;
      const ids = archive.map((object) => {
        return object.carrito_id;
      });

      const max = Math.max(...ids);

      const id = max + 1;
      this.DB.push({ carrito_id: id, productos: [] });

      return id;
    } catch (e) {
      console.log(e);
    }
  };

  postById = async (idCart, idProd, timestamp) => {
    try {
    //   const newDataCart = this.DB
    //   const newDataProd = this.productos

    //   const newDataCart = JSON.parse(readDataCart);
    //   const newDataProd = JSON.parse(readDataProd);

      const cart = await this.DB.find((cart) => cart.carrito_id == idCart);

      let isInCart = await cart.productos.some((prod) => prod.id == idProd);

      const prod = await this.productos.find((prod) => prod.id == idProd);

      console.log(isInCart);
      if (isInCart == false) {
        prod.timestamp = timestamp;
        cart.productos.push(prod);
        
        // let carritosString = JSON.stringify(newDataCart);

        this.DB = JSON.PARSE(cart);

        console.log("agregado al carrito");

        return cart
      }
    } catch (e) {
      console.log(e);
    }
  };

  deleteCart = async (id) => {
    ///////////
    try {
      const readData = this.DB;
      const newData = await JSON.parse(readData);

      const indexProd = await newData.findIndex((obj) => obj.carrito_id == id);
      if (indexProd >= 0) {
        await newData.splice(indexProd, 1);
      }

      this.DB = newData;

      console.log("Producto eliminado");
    } catch (e) {
      console.log(e);
    }
  };

  deleteProduct = async (cartId, prodId) => {
    ///////////////////
    try {
      // const readDataCart = this.DB
      const newDataCart = this.DB;

      const cart = newDataCart.find((cart) => cart.carrito_id == cartId);

      const indexCart = await newDataCart.findIndex(
        (cart) => cart.carrito_id == cartId
      );

      if (!cart) {
        console.log("El carrito no existe");
      } else {
        const indexProd = await cart.productos.findIndex(
          (obj) => obj.id == prodId
        );
        if (indexProd >= 0) {
          await newDataCart[indexCart].productos.splice(indexProd, 1);
        }

        // const newCart = JSON.stringify(newDataCart);

        this.DB = newDataCart;

        console.log("Producto eliminado");
        return newDataCart;
      }
    } catch (e) {
      console.log(e);
    }
  };
}

export default CarritoDaoMemoria;
