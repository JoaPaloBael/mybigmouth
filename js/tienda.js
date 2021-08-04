//-------------------------------------------------------CARRITO DE COMPRAS

//1. Obtener referencias del DOM

const sumarBtn = document.querySelectorAll('.sumarBtn'); //btn de añadir al carrito
const comprarBtn = document.querySelector('.comprarBtn'); //Btn de comprar
const contenedorDiscosAgregados = document.querySelector('.contenedorDiscosAgregados');

//2. Capturear interacción del usuario - forEach para colocar evento onclick

sumarBtn.forEach((obj) => {
  obj.addEventListener('click', sumarBtnClickeado);
});

comprarBtn.addEventListener('click', comprarBtnClickeado);

// 3. Reaccionar a la interacción del usuario
// Una vez clickeado el boton de añadir, se captura la información en variables.

function sumarBtnClickeado(e) {
  const button = e.target;
  const disco = button.closest('.disco');

  const precioDisco = disco.querySelector('.precioDisco').textContent;
  const tituloDisco = disco.querySelector('.tituloDisco').textContent;
  const imagenDisco = disco.querySelector('.imagenDisco').src;

  sumarAlCarrito(tituloDisco, precioDisco, imagenDisco);
}

//4. Función para agregar los items al contenedorDiscosAgregados con los parametros de 3.
function sumarAlCarrito(tituloDisco, precioDisco, imagenDisco) {
  const tuCompraSeccion = contenedorDiscosAgregados.getElementsByClassName('nombreDiscoEnCarrito');
  //Bucle for
  for (let i = 0; i < tuCompraSeccion.length; i++) {
    if (tuCompraSeccion[i].innerText === tituloDisco) {
      let cantidadDiscos = tuCompraSeccion[
        i
      ].parentElement.parentElement.parentElement.querySelector(
        '.cantidadDeCadaDiscoEnCarritoNum'
      );
      cantidadDiscos.value++;
        //bootstrap - Cartel de incremento de producto
      $('.toast').toast('show');
      actualizarTotalCarrito();
      return;
    }
  }

  //5. Modificar el DOM en la sección de "tu compra"
  const filaTuCompra = document.createElement('div');
  const contenidoCarrito = `
  <div class="row itemCarrito">
        <div class="col-8">
            <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <img src=${imagenDisco} class="shopping-cart-image">
                <h6 class="shopping-cart-tituloDisco nombreDiscoEnCarrito text-truncate ml-3 mb-0">${tituloDisco}</h6>
            </div>
        </div>
        <div class="col-2">
            <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <p class="precioDisco mb-0 precioDiscoEnCarritoNum">${precioDisco}</p>
            </div>
        </div>
        <div class="col-2">
            <div
                class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                <input class="shopping-cart-quantity-input cantidadDeCadaDiscoEnCarritoNum" type="number"
                    value="1" min="1" max="20">
                <button class="btn btn-danger buttonDelete" type="button">X</button>
            </div>
        </div>
    </div>
    `;
  filaTuCompra.innerHTML = contenidoCarrito;
  contenedorDiscosAgregados.append(filaTuCompra);

  //6. Eliminar Disco del carrito
  filaTuCompra
    .querySelector('.buttonDelete')
    .addEventListener('click', eliminarDiscoCarrito);

  //7. Actualizar la cantidad de cada disco
  filaTuCompra
    .querySelector('.cantidadDeCadaDiscoEnCarritoNum')
    .addEventListener('change', cambiarCantidad);

  actualizarTotalCarrito();

}

//8. Actualizar precio total del carrito
function actualizarTotalCarrito() {
  //---Variables locales
  let total = 0;
  const precioFinalCarrito = document.querySelector('.precioFinalCarrito');
  const itemsCarrito = document.querySelectorAll('.itemCarrito');

  // forEach para recorrer el carrito
  itemsCarrito.forEach((itemCarrito) => {
    const precioDiscoEnCarrito = itemCarrito.querySelector('.precioDiscoEnCarritoNum');
    const precioDiscoEnCarritoNum = Number(precioDiscoEnCarrito.textContent.replace('$', ''));
    const cantidadDeCadaDiscoEnCarrito = itemCarrito.querySelector('.cantidadDeCadaDiscoEnCarritoNum');
    const cantidadDeCadaDiscoEnCarritoNum = Number(cantidadDeCadaDiscoEnCarrito.value);
    total = total + precioDiscoEnCarritoNum * cantidadDeCadaDiscoEnCarritoNum;
  });

  precioFinalCarrito.innerHTML = `${total.toFixed(2)}$`;
}

//9. Funciones de Actualizar cantidad, eliminar disco y actualizar precio total
function eliminarDiscoCarrito(event) {
  const buttonClicked = event.target;
  buttonClicked.closest('.itemCarrito').remove();
  actualizarTotalCarrito();
}

function cambiarCantidad(event) {
  const input = event.target;
  input.value <= 0 ? (input.value = 1) : null;
  actualizarTotalCarrito();
}

function comprarBtnClickeado() {
  contenedorDiscosAgregados.innerHTML = '';
  actualizarTotalCarrito();
}