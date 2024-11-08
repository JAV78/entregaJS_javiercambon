const guardarProductosLS = (productos) => {
    localStorage.setItem("productos", JSON.stringify(productos));
}

const cargarProductosLS = () => {
    return JSON.parse(localStorage.getItem("productos")) || [];
}

const guardarCarritoLS = (productos) => {
    localStorage.setItem("carrito", JSON.stringify(productos));
}

const cargarCarritoLS = () => {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}   

const totalCarrito = () => {
    const carrito = cargarCarritoLS();
    return carrito.reduce((acum, item) => acum += item.precio, 0);

}

const mostrarMensaje = (texto) => {
    Swal.fire(texto);
}

function agregarProducto(id) {
    const productos = cargarProductosLS();
    const carrito = cargarCarritoLS();
    const producto = productos.find(item => item.id == id);  
    if (producto) {
        carrito.push(producto);
        guardarCarritoLS(carrito);
        mostrarMensaje("Listo!");
        actualizarContadorCarrito(); 
    }
}

const actualizarContadorCarrito = () => {
    const carrito = cargarCarritoLS();
    const contadorCarrito = document.querySelector('.badge'); 
    
    if (contadorCarrito) {
        contadorCarrito.textContent = carrito.length > 0 ? carrito.length : ''; 
    }
}

const limpiarCarrito = () => {
    localStorage.removeItem("carrito");
    renderCarrito();
}

const renderProductos = () => {
    const productos = cargarProductosLS();
    let contenidoHTML = "";

    for (const item of productos) {
        contenidoHTML += `<div class="card" style="width: 18rem; margin:30px">
            <img src="${item.imagen}" class="card-img-top" alt="${item.nombre}">
            <div class="card-body">         
                <p class="card-text">${item.nombre}<br><b>${item.precio}</b></p>
                <button class="btn btn-primary" onclick="agregarProducto(${item.id})">Añadir al carrito</button>
            </div>
        </div>`;
    }

    document.getElementById("contenido").innerHTML = contenidoHTML;
    actualizarContadorCarrito(); 
}

const eliminarProducto = (id) => {
    const carrito = cargarCarritoLS();
    const index = carrito.findIndex(item => item.id === id);

    if (index !== -1) {        
        carrito.splice(index, 1);
        guardarCarritoLS(carrito);
        renderCarrito();
        actualizarContadorCarrito();
    }
    
}

const renderCarrito = () => {
    const carrito = cargarCarritoLS();
    let contenidoHTML;
    if (carrito.length > 0) {
        contenidoHTML = `<table class="table table-striped">

        <tr>
       <td colspan="4" class="text-end"><button class="btn btn-danger" onclick="limpiarCarrito();">Limpiar Carrito</button></td>
       </tr>`;
     

        for (const item of carrito) {
            contenidoHTML += `<tr style="height: 50px;">
            <td style="padding: 5px; width: 160px;"  >
                <img src="${item.imagen}" alt="${item.nombre}" 
                class="img-fluid rounded"
                style="width: 50px; height: 50px; object-fit: cover;">
            </td>
            <td style="padding: 5px;">${item.nombre}</td>
            <td style="padding: 5px;">$U ${item.precio}</td>
            <td style="padding: 5px; text-align: center;">
                <i class="bi bi-trash3" onclick="eliminarProducto(${item.id});" style="cursor: pointer;"></i>
            </td>
        </tr>`;
    }

    contenidoHTML +=  `<tr>
    <td colspan="3" style="text-align: right;"><b>Total: $U ${totalCarrito()}</b></td>
    </tr>
    </table>`;

    document.getElementById("contenido").innerHTML = contenidoHTML;
  
    } else {
        contenidoHTML = `<div class="alert alert-primary text-center" role="alert">No hay productos en el carrito</div>`;
    }

    document.getElementById("contenido").innerHTML = contenidoHTML;
}

document.addEventListener("DOMContentLoaded", () => {
    actualizarContadorCarrito(); 
});


