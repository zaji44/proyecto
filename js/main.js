let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let productos = [];

// Elementos del DOM
const contenedorProductos = document.getElementById("productos-container");
const contenedorCarrito = document.getElementById("carrito-container");
const totalElemento = document.getElementById("total-precio");
const loader = document.getElementById("loader");
const btnVaciar = document.getElementById("btn-vaciar");
const btnFinalizar = document.getElementById("btn-finalizar");


async function obtenerProductos() {
    try {
        const respuesta = await fetch("./data/productos.json");
        
        if (!respuesta.ok) {
            throw new Error(`Error HTTP status: ${respuesta.status}`);
        }
        
        productos = await respuesta.json();
        renderizarProductos(productos);

    } catch (error) {
        console.error("Detalle del error:", error);
        
        // Uso de librería externa SweetAlert2 para el error
        Swal.fire({
            icon: "error",
            title: "Error al cargar datos",
            text: "No se pudieron obtener los productos de la tienda.",
            confirmButtonText: "Entendido"
        });

    } finally {
        // Se ejecuta siempre para ocultar el loader
        loader.style.display = "none";
    }
}

function renderizarProductos(lista) {
    contenedorProductos.innerHTML = "";

    // FUNCIÓN DE ORDEN SUPERIOR 1: forEach
    lista.forEach(producto => {
        // Destructuring del objeto producto incluyendo la imagen
        const { id, nombre, precio, imagen } = producto;

        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <img src="${imagen}" alt="${nombre}" class="card-img">
            <h3>${nombre}</h3>
            <p>$${precio.toLocaleString("es-AR")}</p>
            <button class="btn btn-agregar" onclick="agregarAlCarrito(${id})">Agregar al Carrito</button>
        `;
        contenedorProductos.appendChild(card);
    });
}

function agregarAlCarrito(idProducto) {
    // FUNCIÓN DE ORDEN SUPERIOR 2: find
    const productoSeleccionado = productos.find(p => p.id === idProducto);

    if (productoSeleccionado) {
        carrito.push(productoSeleccionado);
        actualizarCarrito();

        // Librería Toastify para feedback visual
        Toastify({
            text: `✅ ${productoSeleccionado.nombre} agregado al carrito`,
            duration: 2500,
            gravity: "bottom",
            position: "right",
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)"
            }
        }).showToast();
    }
}

function eliminarDelCarrito(index) {
    // Modificar el array borrando por índice
    carrito.splice(index, 1);
    actualizarCarrito();

    Toastify({
        text: "🗑️ Producto eliminado del carrito",
        duration: 2000,
        gravity: "bottom",
        position: "right",
        style: {
            background: "linear-gradient(to right, #ff5f6d, #ffc371)"
        }
    }).showToast();
}

function actualizarCarrito() {
    // Guardar en Storage
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarCarrito();
}

function renderizarCarrito() {
    contenedorCarrito.innerHTML = "";

    // OPERADOR TERNARIO
    carrito.length === 0
        ? contenedorCarrito.innerHTML = "<p>El carrito está vacío.</p>"
        : carrito.forEach((prod, index) => {
            const { nombre, precio } = prod; // Destructuring
            const item = document.createElement("div");
            item.classList.add("item-carrito");
            item.innerHTML = `
                <span>${nombre} - $${precio.toLocaleString("es-AR")}</span>
                <button class="btn-eliminar" onclick="eliminarDelCarrito(${index})">❌</button>
            `;
            contenedorCarrito.appendChild(item);
        });

    // FUNCIÓN DE ORDEN SUPERIOR 3: reduce
    const total = carrito.reduce((acc, prod) => acc + prod.precio, 0);
    totalElemento.textContent = `$${total.toLocaleString("es-AR")}`;
}


// Vaciar Storage completamente
btnVaciar.addEventListener("click", () => {
    if (carrito.length === 0) return;

    carrito = [];
    localStorage.removeItem("carrito");
    renderizarCarrito();

    Toastify({
        text: "🧹 Carrito vaciado con éxito",
        duration: 2000,
        gravity: "bottom",
        position: "right",
        style: { background: "#6c757d" }
    }).showToast();
});

// Finalizar circuito comercial
btnFinalizar.addEventListener("click", () => {
    if (carrito.length === 0) {
        Swal.fire({
            icon: "warning",
            title: "Carrito vacío",
            text: "Agregá productos antes de finalizar la compra.",
            confirmButtonColor: "#3085d6"
        });
        return;
    }

    const totalCalculado = totalElemento.textContent;

    // Confirmación mediante SweetAlert2 (reemplaza confirm/alert nativos)
    Swal.fire({
        title: "¿Deseas finalizar la compra?",
        text: `El total a abonar es ${totalCalculado}`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#28a745",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, comprar",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                "¡Compra Exitosa!",
                "Gracias por tu compra. Te enviamos los detalles por email.",
                "success"
            );
            
            // Vaciar datos tras la compra
            carrito = [];
            localStorage.removeItem("carrito");
            renderizarCarrito();
        }
    });
});


obtenerProductos();
renderizarCarrito();