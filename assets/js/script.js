class Producto {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
}

class Carrito {
    constructor() {
        this.productos = [];
    }

    agregarProducto(producto) {
        this.productos.push(producto);
    }

    calcularTotal() {
        return this.productos.reduce((total, producto) => total + producto.precio, 0);
    }

    mostrarDetalles() {
        return this.productos.map(producto => `${producto.nombre}: $${producto.precio.toLocaleString('es-CL')}`).join("\n");
    }

    finalizarCompra() {
        const totalCompra = this.calcularTotal();
        this.productos = [];  
        return totalCompra;
    }
}

// Crear instancia del carrito
const carrito = new Carrito();

// Obtener elementos del DOM
const listaCarrito = document.getElementById('listaCarrito');
const totalElement = document.getElementById('total');
const detalleCompra = document.getElementById('detalle');

// Función para actualizar el carrito en la página
function actualizarCarrito() {
    listaCarrito.innerHTML = "";  
    carrito.productos.forEach(producto => {
        const li = document.createElement('li');
        li.textContent = `${producto.nombre} - $${producto.precio.toLocaleString('es-CL')}`;
        listaCarrito.appendChild(li);
    });
    totalElement.textContent = carrito.calcularTotal().toLocaleString('es-CL');
}


document.querySelectorAll('.agregarCarrito').forEach(boton => {
    boton.addEventListener('click', (event) => {
        const productoDiv = event.target.closest('.producto');
        const productoData = productoDiv.getAttribute('data-producto');
        const [nombre, precio] = productoData.split(",");
        const nuevoProducto = new Producto(nombre, parseFloat(precio));
        carrito.agregarProducto(nuevoProducto);
        actualizarCarrito();
    });
});

// Finalizar la compra
document.getElementById('finalizartuCompra').addEventListener('click', () => {
    if (carrito.productos.length === 0) {
        alert("No hay productos en el carrito.");
        return;
    }

    const totalCompra = carrito.finalizarCompra();
    alert("Gracias por tu compra. Total: $" + totalCompra.toLocaleString('es-CL'));
    actualizarCarrito();  // Limpiar la interfaz del carrito
});

// Mostrar detalles de la compra
document.getElementById('mostrarDetalles').addEventListener('click', () => {
    const detalles = carrito.mostrarDetalles();
    detalleCompra.textContent = detalles ? detalles : "No hay productos en el carrito.";
    document.getElementById('detallesCompra').classList.remove('hidden');
});
