document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
    cargarClientes();
    const formPedido = document.getElementById('formPedido');
    formPedido.addEventListener('submit', guardarPedido);  // Agregar el event listener al formulario
    const formProductoDetalle = document.getElementById('formProductoDetalle');
    formProductoDetalle.addEventListener('submit', guardarPedidoDetalle);  // Agregar el event listener al formulario


  });
  

  async function cargarProductos() {
    try {
        const response = await fetch('/api/productos');
        if (!response.ok) throw new Error('Error al cargar productos');
        const productos = await response.json();

        const productosSelect = document.getElementById('productos');
        productosSelect.innerHTML = '';  // Limpiar las opciones actuales

        // Crear una opción por defecto
        const opcionDefault = document.createElement('option');
        opcionDefault.value = '';
        opcionDefault.textContent = 'Seleccione un producto';
        productosSelect.appendChild(opcionDefault);

        // Agregar las opciones de productos
        productos.forEach((producto) => {
            const option = document.createElement('option');
            option.value = producto.id;  // Establecer el ID del producto como valor
            option.textContent = producto.denominacion;  // Mostrar el código del producto
            productosSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar productos:', error);
    }
  }
    async function cargarClientes() {
        try {
            const response = await fetch('/api/clientes');
            if (!response.ok) throw new Error('Error al cargar clientes');
            const clientes = await response.json();
    
            const clientesSelect = document.getElementById('clientes');
            clientesSelect.innerHTML = '';  // Limpiar las opciones actuales
    
            // Crear una opción por defecto
            const opcionDefault = document.createElement('option');
            opcionDefault.value = '';
            opcionDefault.textContent = 'Seleccione un cliente';
            clientesSelect.appendChild(opcionDefault);
    
            // Agregar las opciones de clientes
            clientes.forEach((cliente) => {
                const option = document.createElement('option');
                option.value = cliente.id;  // Establecer el ID del clientes como valor
                option.textContent = cliente.razonSocial;  // Mostrar el código del cliente
                clientesSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Error al cargar clientes:', error);
        }
    }

        async function guardarPedido(event) {
            event.preventDefault();  // Evitar que el formulario se envíe de manera tradicional

            const cliente = document.getElementById('clientes').value;
            const nroComprobante = document.getElementById('nroComprobante').value;
            const formaPago = document.getElementById('formaPago').value;
            const observaciones = document.getElementById('observaciones').value;
            const fechaPedido = document.getElementById('fechaPedido').value;
            const pedido = {
                idcliente: parseInt(cliente),
                fechaPedido: new Date(fechaPedido).toLocaleDateString('en-CA'),
                nroComprobante,
                formaPago,
                observaciones,
                totalPedido: null
            };
            
        
            try {
            const response = await fetch('/api/pedido_venta', {
                method : 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(pedido),
            });
        
            if (!response.ok) throw new Error('Error al guardar pedido');
            alert('Pedido guardado');
            //cargarPedidos();
            } catch (error) {
            console.error('Error al guardar pedido:', error);
            }
    }


async function guardarPedidoDetalle(event) {
    event.preventDefault();  // Evitar que el formulario se envíe de manera tradicional

    const producto = document.getElementById('productos').value;
    const cantidad = document.getElementById('cantidad').value;

    // Primer fetch para obtener el precio del producto
    let precioProducto;

    try {
        const response = await fetch(`/api/productos/${producto}`);
        console.log(response);
        if (!response.ok) throw new Error('Error al cargar precios');
        precioProducto = await response.json();
    } catch (error) {
        console.error(error);
        return;  // Salir de la función si hay un error
    }
    const clienteId = document.getElementById('clientes').value;
    console.log(clienteId);
    let subtotal = parseFloat(cantidad) * parseFloat(precioProducto.precioVenta);
    const pedidoDetalle = {
        idpedidoVenta: 1,
        idproducto: parseInt(producto),
        cantidad: parseInt(cantidad),
        subtotal
    };

    
    // Segundo fetch para guardar el detalle del pedido
    try {
        const response = await fetch('/api/pedido_venta_detalle', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pedidoDetalle),
        });

        if (!response.ok) throw new Error('Error al guardar pedido detalle');
        alert('Pedido Detalle Guardado');
    } catch (error) {
        console.error('Error al guardar pedido:', error);
    }
}
