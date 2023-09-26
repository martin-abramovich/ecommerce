const cantidadProductos = cart.getCart().length; 
const cantidadProductosElement = document.getElementById('cantidad-productos');
cantidadProductosElement.textContent = `Productos (${cantidadProductos})`;
