document.addEventListener('DOMContentLoaded', () => {
    cargarPedidos();
    cargarProductos();
    cargarClientes();

    const formPedido = document.getElementById('formPedido');
    formPedido.addEventListener('submit', guardarPedido);

    const formProductoDetalle = document.getElementById('formProductoDetalle');
    formProductoDetalle.addEventListener('submit', guardarPedidoDetalle);
    
    const btnFinalizarPedido = document.getElementById('btnFinalizarPedido');
    btnFinalizarPedido.addEventListener('click', ActualizarTotalPedido);

    const btnNroComprobanteBusqueda = document.getElementById('btnNroComprobanteBusqueda');
    btnNroComprobanteBusqueda.addEventListener('click', buscarPedidoPorComprobante);

    const btnFechaBusqueda = document.getElementById('btnFechaBusqueda');
    btnFechaBusqueda.addEventListener('click', buscarPedidoPorFecha);
});

async function cargarProductos() {
    try {
        const response = await fetch('/api/productos');
        if (!response.ok) throw new Error('Error al cargar productos');
        const productos = await response.json();

        const productosSelect = document.getElementById('productos');
        productosSelect.innerHTML = '';

        const opcionDefault = document.createElement('option');
        opcionDefault.value = '';
        opcionDefault.textContent = 'Seleccione un producto';
        productosSelect.appendChild(opcionDefault);

        //agrega opciones de productos
        productos.forEach((producto) => {
            const option = document.createElement('option');
            option.value = producto.id;
            option.textContent = producto.denominacion;
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
        clientesSelect.innerHTML = '';

        const opcionDefault = document.createElement('option');
        opcionDefault.value = '';
        opcionDefault.textContent = 'Seleccione un cliente';
        clientesSelect.appendChild(opcionDefault);

        //opciones de clientes
        clientes.forEach((cliente) => {
            const option = document.createElement('option');
            option.value = cliente.id;
            option.textContent = cliente.razonSocial;
            clientesSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar clientes:', error);
    }
}

async function guardarPedido(event) {
    event.preventDefault();

    //valores formulario
    const cliente = document.getElementById('clientes').value;
    const nroComprobante = document.getElementById('nroComprobante').value;
    const formaPago = document.getElementById('formaPago').value;
    const observaciones = document.getElementById('observaciones').value;
    const fechaPedido = document.getElementById('fechaPedido').value;

    //objeto del pedido
    const pedido = {
        idcliente: parseInt(cliente),
        fechaPedido: new Date(fechaPedido).toLocaleDateString('en-CA'),
        nroComprobante,
        formaPago,
        observaciones,
        totalPedido: null
    };

    //bloquea campos formulario
    const formElements = document.getElementById('formPedido').elements;
    Array.from(formElements).forEach(element => {
        element.disabled = true;
    });

    try {
        const response = await fetch('/api/pedido_venta', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pedido),
        });

        if (!response.ok) throw new Error('Error al guardar pedido');
        alert('Pedido guardado');
    } catch (error) {
        console.error('Error al guardar pedido:', error);
    }
}

async function guardarPedidoDetalle(event) {
    event.preventDefault();

    const producto = document.getElementById('productos').value;
    const cantidad = document.getElementById('cantidad').value;

    let precioProducto;

    try {
        const response = await fetch(`/api/productos/${producto}`);
        if (!response.ok) throw new Error('Error al cargar precios');
        precioProducto = await response.json();
    } catch (error) {
        console.error(error);
        return;
    }

    const idcliente = document.getElementById('clientes').value;
    const nroComprobante = document.getElementById('nroComprobante').value;

    let idpedidoVenta;

    try {
        const response = await fetch(`/api/pedido_venta/${nroComprobante}/${idcliente}`);
        if (!response.ok) throw new Error('Error al obtener');
        idpedidoVenta = await response.json();
    } catch (error) {
        console.error(error);
        return;
    }

    let subtotal = parseFloat(cantidad) * parseFloat(precioProducto.precioVenta);
    const pedidoDetalle = {
        idpedidoVenta: parseInt(idpedidoVenta.id),
        idproducto: parseInt(producto),
        cantidad: parseInt(cantidad),
        subtotal
    };
    const formProductoDetalle = document.getElementById('formProductoDetalle');

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
        formProductoDetalle.reset();
    } catch (error) {
        console.error('Error al guardar pedido:', error);
    }
}

async function ActualizarTotalPedido(event) {
    //evita que el formulario se envie si es un boton de tipo submit
    event.preventDefault();

    const idcliente = document.getElementById('clientes').value;
    const nroComprobante = document.getElementById('nroComprobante').value;

    let idpedidoVenta;

    try {
        const response = await fetch(`/api/pedido_venta/${nroComprobante}/${idcliente}`);
        if (!response.ok) throw new Error('Error al obtener');
        idpedidoVenta = await response.json();
    } catch (error) {
        console.error(error);
        return;
    }
    idpedidoVenta = parseInt(idpedidoVenta.id);
    console.log("ID PEDIDO VENTA: " + idpedidoVenta);

    let totalPedido = 0;

    try {
        const response = await fetch(`/api/pedido_venta_detalle/subtotales/${parseInt(idpedidoVenta)}`);
        if (!response.ok) throw new Error('Error al obtener');
        totalPedido = await response.json();
    } catch (error) {
        console.error(error);
        return;
    }

    console.log("TOTAL PEDIDO: " + totalPedido);

    totalPedido = parseFloat(totalPedido.totalSubtotales)

    const url = `localhost:3000/api/pedido_venta/${idpedidoVenta}/actualizar-total/${totalPedido}`
    console.log("URL: " + url);

    try {
        const response = await fetch(`/api/pedido_venta/${idpedidoVenta}/actualizar-total/${totalPedido}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ total: totalPedido }),
        });

        if (!response.ok) {
            throw new Error('Error al actualizar el pedido');
        }

        const data = await response.json();
        console.log('Pedido actualizado:', data);
        alert('Pedido actualizado correctamente');
        
    } catch (error) {
        console.error('Error al actualizar el pedido:', error);
        alert('Hubo un error al actualizar el pedido.');
    }

    //obtener formulario
    const formProductoDetalle = document.getElementById('formProductoDetalle');
    const formPedido = document.getElementById('formPedido');

    //resetear ambos formularios
    formProductoDetalle.reset();
    formPedido.reset();

    Array.from(formPedido.elements).forEach(element => element.disabled = false);

    cargarPedidos();
}

async function cargarPedidos() {
    try {
        const response = await fetch('/api/pedido_venta');
        if (!response.ok) throw new Error('Error al cargar pedidos');
        const pedidos = await response.json();

        const pedidosTable = document.getElementById('tablaPedidos').querySelector('tbody');
        pedidosTable.innerHTML = '';

        for (const pedido of pedidos) {
            try {
                const clienteResponse = await fetch(`/api/clientes/${pedido.idcliente}`);
                if (!clienteResponse.ok) throw new Error('Error al cargar clientes');

                const cliente = await clienteResponse.json();
                const fechaPedido = new Date(pedido.fechaPedido).toISOString().split('T')[0];

                const row = document.createElement('tr');
                row.innerHTML = `
                  <td>${pedido.id}</td>
                  <td>${cliente.razonSocial}</td>
                  <td>${fechaPedido}</td>
                  <td>${pedido.nroComprobante}</td>
                  <td>${pedido.totalPedido}</td>
                  <td></td>
                `;

                //boton eliminar
                const eliminarBtn = document.createElement('button');
                eliminarBtn.textContent = 'Eliminar';
                eliminarBtn.addEventListener('click', () => bajaPedido(pedido.id));

                const actionsCell = row.querySelector('td:last-child');
                actionsCell.appendChild(eliminarBtn);

                //boton editar
                const editarBtn = document.createElement('button');
                editarBtn.textContent = 'Editar';
                editarBtn.addEventListener('click', () => editarPedido(pedido.id));

                const editarCell = row.querySelector('td:last-child');
                editarCell.appendChild(editarBtn);

                //boton pdf
                const pdfBtn = document.createElement('button');
                pdfBtn.textContent = 'PDF';
                //pdfBtn.addEventListener('click', () => bajaPedido(pedido.id));

                const PDFCell = row.querySelector('td:last-child');
                PDFCell.appendChild(pdfBtn);

                pedidosTable.appendChild(row);
            } catch (error) {
                console.error('Error al cargar cliente:', error);
            }
        }
    } catch (error) {
        console.error('Error al cargar pedidos:', error);
    }
}

async function bajaPedido(id) {
    try {
        const response = await fetch(`/api/pedido_venta/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Error al eliminar pedido');
        alert('Pedido eliminado');
        cargarPedidos();
    } catch (error) {
        console.error('Error al eliminar pedido:', error);
    }
}

async function buscarPedidoPorComprobante(event) {
    event.preventDefault();

    const nroComprobanteInput = document.getElementById('nroComprobanteBusqueda');
    const nroComprobante = nroComprobanteInput.value.trim();

    console.log("nroComprobante: " + nroComprobante);
    try {
        const response = await fetch(`/api/pedido_venta/buscar/${nroComprobante}`);
        if (!response.ok) throw new Error('Error al buscar el pedido');

        const pedidos = await response.json();

        if (pedidos.length === 0) {
            alert('No se encontró un pedido con el número de comprobante ingresado');
            return;
        }

        const pedidosTable = document.getElementById('tablaPedidos').querySelector('tbody');
        pedidosTable.innerHTML = '';

        for (const pedido of pedidos) {
            const clienteResponse = await fetch(`/api/clientes/${pedido.idcliente}`);
            if (!clienteResponse.ok) throw new Error('Error al cargar cliente asociado');
            const cliente = await clienteResponse.json();

            const fechaPedido = new Date(pedido.fechaPedido).toISOString().split('T')[0];

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${pedido.id}</td>
                <td>${cliente.razonSocial}</td>
                <td>${fechaPedido}</td>
                <td>${pedido.nroComprobante}</td>
                <td>${pedido.totalPedido}</td>
                <td></td>
                `;

            const eliminarBtn = document.createElement('button');
            eliminarBtn.textContent = 'Eliminar';
            eliminarBtn.addEventListener('click', () => bajaPedido(pedido.id));

            const actionsCell = row.querySelector('td:last-child');
            actionsCell.appendChild(eliminarBtn);

            const editarBtn = document.createElement('button');
            editarBtn.textContent = 'Editar';
            editarBtn.addEventListener('click', () => editarPedido(pedido.id));

            const editarCell = row.querySelector('td:last-child');
            editarCell.appendChild(editarBtn);

            const pdfBtn = document.createElement('button');
            pdfBtn.textContent = 'PDF';
            //pdfBtn.addEventListener('click', () => bajaPedido(pedido.id));

            const PDFCell = row.querySelector('td:last-child');
            PDFCell.appendChild(pdfBtn);

            pedidosTable.appendChild(row);
        }
    } catch (error) {
        console.error('Error al buscar el pedido:', error);
        alert('Ocurrió un error al buscar el pedido');
    }
}

async function buscarPedidoPorFecha(event) {
    event.preventDefault();

    const fechaInicioInput = document.getElementById('fechaInicio');
    const fechaFinInput = document.getElementById('fechaFin');
    const fechaInicio = fechaInicioInput.value.trim();
    const fechaFin = fechaFinInput.value.trim();

    if (!fechaInicio || !fechaFin) {
        alert('Por favor, ingrese ambas fechas.');
        return;
    }

    try {
        const response = await fetch(`/api/pedido_venta/buscar?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`);
        if (!response.ok) throw new Error('Error al buscar los pedidos');

        const pedidos = await response.json();

        if (pedidos.length === 0) {
            alert('No se encontraron pedidos en ese rango de fechas');
            return;
        }

        const pedidosTable = document.getElementById('tablaPedidos').querySelector('tbody');
        pedidosTable.innerHTML = ''; // Limpiar tabla

        for (const pedido of pedidos) {
            const clienteResponse = await fetch(`/api/clientes/${pedido.idcliente}`);
            if (!clienteResponse.ok) throw new Error('Error al cargar cliente asociado');
            const cliente = await clienteResponse.json();

            const fechaPedido = new Date(pedido.fechaPedido).toISOString().split('T')[0];

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${pedido.id}</td>
                <td>${cliente.razonSocial}</td>
                <td>${fechaPedido}</td>
                <td>${pedido.nroComprobante}</td>
                <td>${pedido.totalPedido}</td>
                <td></td>
                `;

            const eliminarBtn = document.createElement('button');
            eliminarBtn.textContent = 'Eliminar';
            eliminarBtn.addEventListener('click', () => bajaPedido(pedido.id));

            const actionsCell = row.querySelector('td:last-child');
            actionsCell.appendChild(eliminarBtn);

            const editarBtn = document.createElement('button');
            editarBtn.textContent = 'Editar';
            editarBtn.addEventListener('click', () => editarPedido(pedido.id));

            const editarCell = row.querySelector('td:last-child');
            editarCell.appendChild(editarBtn);

            const pdfBtn = document.createElement('button');
            pdfBtn.textContent = 'PDF';
            //pdfBtn.addEventListener('click', () => bajaPedido(pedido.id));

            const PDFCell = row.querySelector('td:last-child');
            PDFCell.appendChild(pdfBtn);

            pedidosTable.appendChild(row);
        }
    } catch (error) {
        console.error('Error al buscar el pedido:', error);
        alert('Ocurrió un error al buscar los pedidos');
    }
}

function editarPedido(idPedido) {
    //ir a edicion.html
    window.location.href = `edicion.html?id=${idPedido}`;
}
