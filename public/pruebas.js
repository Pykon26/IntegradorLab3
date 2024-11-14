document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
    cargarClientes();
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

    // async function guardarPedido() {
    //     const form = document.getElementById("formPedido");
    //     const cliente = document.getElementById('cliente').value;
    //     const fechaPedido = document.getElementById('fechaPedido').value;
    //     const producto = document.getElementById('producto').value;
      
    //     const pedido = {
    //       idCliente: parseInt(cliente),
    //       fechaPedido: new Date(fechaPedido),
    //       producto
    //     };
      
    //     try {
    //       const method = id? 'PUT' : 'POST';
    //       const url = id? /api/pedidos/${id} : '/api/pedidos';
    //       const response = await fetch(url, {
    //         method,
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(pedido),
    //       });
      
    //       if (!response.ok) throw new Error('Error al guardar pedido');
    //       alert(id ? 'Pedido actualizado' : 'Pedido guardado');
    //       cargarPedidos();
    //     } catch (error) {
    //       console.error('Error al guardar pedido:', error);
    //     }
    //   }
   