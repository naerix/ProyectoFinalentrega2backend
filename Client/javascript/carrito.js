const API_URL = "http://localhost:8080/api/carrito/";

async function productos(){

    await fetch(API_URL + "2/productos")
  .then((res) => res.json())
  .then((data) => {
    let cart = document.getElementById("prodCart");
    let cantProd =  data.productos.length
    document.getElementById("cantProductos").innerText = cantProd

    let precioTotal = 0
    console.log(data)
     data.productos.forEach((prod) => {
      precioTotal += parseInt(prod.price)
       cart.innerHTML += `

<hr class="my-4">
      
                        <div class="row mb-4 d-flex justify-content-between align-items-center">
                          <div class="col-md-2 col-lg-2 col-xl-2">
                            <img
                              src="${prod.thumbnail}"
                              class="img-fluid rounded-3" alt="${prod.name}">
                          </div>
                          <div class="col-md-3 col-lg-3 col-xl-3">
                            <h6 class="text-muted">Shirt</h6>
                            <h6 class="text-black mb-0">${prod.name}</h6>
                          </div>
                          `+
                        //   <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                        //     <button class="btn btn-link px-2"
                        //     onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
                        //     <i class="fas fa-minus"></i>
                        //      </button>
      
                        //     <input id="form1" min="0" name="quantity" value="1" type="number"
                        //     class="form-control form-control-sm" />
      
                        //     <button class="btn btn-link px-2"
                        //     onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
                        //      <i class="fas fa-plus"></i>
                        //     </button>
                        //   </div>
                          `
                          <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                            <h6 class="mb-0">$ ${parseInt(prod.price).toLocaleString('de-DE')}</h6>
                          </div>
                          <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                            <a href="#!" class="text-muted" onclick="eliminarProd(${prod.id})"><i class="fas fa-times"></i></a>
                          </div>
                        </div>
                        `;
    });

    document.getElementById('precioTotal').innerText = precioTotal.toLocaleString('de-DE')
  });

}

productos()

function eliminarProd(id){

      fetch(API_URL+`2/productos/${id}` , {method:"DELETE"} )
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            location.reload()
        })
        .catch((error) => console.error("Error: ", error));

}

