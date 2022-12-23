const API_URL = "http://localhost:8080/";
const isAdmin = false;

// let productos = document.getElementById("productos");
// productos.addEventListener ("click", e => {
//   e.preventDefault();
  
//   console.log(e.target.dataset)
  
//   if (e.target.dataset.funcion == "comprarProd"){
//     // elimininarProd(e.target.data.id)
//     console.log(e.target.dataset.funcion)
//     comprarProd(e.target.dataset.id)
//   }
// })

async function getResponse() {
  await fetch(API_URL + "api/productos")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((prod) => {
        productos.innerHTML += `
      <div class="col">
      <div class="card">
        <img src="${prod.thumbnail}" class="card-img-top"
          alt="${prod.name}" />
          <div class="card-body">
          <h5 class="card-title">${prod.name}</h5>

          <p class="card-text">
          $ ${(prod.price).toLocaleString('de-DE')}
          </p>
          ${
            isAdmin
              ? `<button type="button" class="btn btn-secondary botonAct" disabled>Actualizar</button><i class="fa-solid fa-trash" onclick="eliminarProd(${prod.id})" data-id="${prod.id}"></i>`
              : `<form onsubmit = "return false"><button type="submit"  class="compra btn btn-secondary" onclick ="comprarProd(${prod.id})" >Comprar</button></form>`
          }

        </div>
      </div>
    </div>
    `;
    // onclick="comprarProd(${prod.id})"

      });
      
    })
    
    .catch((err) => console.log(err));
  }
  
getResponse();

function eliminarProd(id) {
  fetch(API_URL + "api/productos/" + id, { method: "DELETE" })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => console.error("Error: ", error));
}


function comprarProd(id){
console.log(id)

fetch(API_URL +  `api/carrito/2/productos/${id}`, {method : "POST"})
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    console.log("Producto agregado al carrito");
    
  })
  .catch((error) => console.error("Error: ", error));

}
  
