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
        mostrarMensaje("¡Producto añadido al carrito!");
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

const renderProductos = () => {
    const productos = cargarProductosLS();
    let contenidoHTML = "";

    for (const item of productos) {
        contenidoHTML += `<div class="card" style="width: 18rem;">
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

document.addEventListener("DOMContentLoaded", () => {
    actualizarContadorCarrito(); 
});


