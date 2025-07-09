// Simulación de una base de datos de productos
const productos = [
    { id: 1, nombre: 'Arroz', precio: 100 },
    { id: 2, nombre: 'Aceite', precio: 200 },
    { id: 3, nombre: 'Azúcar', precio: 300 },
    { id: 4, nombre: 'Harina', precio: 400 },
    { id: 5, nombre: 'Leche', precio: 500 },
];

// Variable para almacenar el carrito de compras
let carrito = [];

// Referencias a los elementos del DOM
const productosDisponiblesDiv = document.getElementById('productos-disponibles');
const itemsCarritoUl = document.getElementById('items-carrito');
const totalCarritoSpan = document.getElementById('total-carrito');
const btnVaciarCarrito = document.getElementById('btn-vaciar-carrito');

// Mostrar los productos en pantalla
function mostrarProductos() {
    productosDisponiblesDiv.innerHTML = '';

    productos.forEach(producto => {
        const productoCard = document.createElement('div');
        productoCard.classList.add('col-md-4', 'mb-4'); // ❗️corregido "col-md4" → "col-md-4"

        productoCard.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">$${producto.precio}</p>
                    <button class="btn btn-primary btn-agregar-carrito" data-id="${producto.id}">Agregar al carrito</button>
                </div>
            </div>
        `;
        productosDisponiblesDiv.appendChild(productoCard);
    });

    // Añadir eventos a los botones
    document.querySelectorAll('.btn-agregar-carrito').forEach(button => {
        button.addEventListener('click', agregarAlCarrito);
    });
}

// Agregar producto al carrito
function agregarAlCarrito(event) {
    const productoId = parseInt(event.target.dataset.id);
    const productoAgregado = productos.find(producto => producto.id === productoId);

    if (productoAgregado) {
        const itemExistente = carrito.find(item => item.id === productoId);

        if (itemExistente) {
            itemExistente.cantidad++;
        } else {
            carrito.push({ ...productoAgregado, cantidad: 1 });
        }

        mostrarCarrito();
    }
}

// Mostrar el carrito
function mostrarCarrito() {
    itemsCarritoUl.innerHTML = '';

    if (carrito.length === 0) {
        itemsCarritoUl.innerHTML = '<li class="list-group-item">El carrito está vacío</li>';
    } else {
        carrito.forEach(item => {
            const listaItem = document.createElement('li');
            listaItem.classList.add('list-group-item', 'justify-content-between', 'd-flex', 'align-items-center');

            // ❗️Error corregido: estaba haciendo `item.nombre * item.cantidad`, lo correcto es `item.precio * item.cantidad`
            listaItem.innerHTML = `
                ${item.nombre} x ${item.cantidad} - $${item.precio * item.cantidad}
                <button class="btn btn-danger btn-sm btn-eliminar" data-id="${item.id}">Eliminar</button>
            `;

            itemsCarritoUl.appendChild(listaItem);
        });
    }

    calcularTotal();

    // Añadir eventos a los botones de eliminar
    document.querySelectorAll('.btn-eliminar').forEach(button => {
        button.addEventListener('click', eliminarDelCarrito);
    });
}

// Calcular el total del carrito
function calcularTotal() {
    let total = 0;
    carrito.forEach(item => {
        total += item.precio * item.cantidad;
    });
    totalCarritoSpan.textContent = total;
}

// Vaciar el carrito
function vaciarCarrito() {
    carrito = [];
    mostrarCarrito();
}

// Eliminar producto del carrito
function eliminarDelCarrito(event) {
    const productoId = parseInt(event.target.dataset.id);
    const itemEncontrado = carrito.find(item => item.id === productoId);

    if (itemEncontrado) {
        if (itemEncontrado.cantidad > 1) {
            itemEncontrado.cantidad--;
        } else {
            carrito = carrito.filter(item => item.id !== productoId);
        }

        mostrarCarrito(); // ❗️ Faltaba volver a mostrar el carrito
    }
}

// Evento para vaciar el carrito
btnVaciarCarrito.addEventListener('click', vaciarCarrito);

// Mostrar productos y carrito al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    mostrarProductos();
    mostrarCarrito();
});
