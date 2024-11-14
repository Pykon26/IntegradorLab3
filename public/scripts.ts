document.addEventListener('DOMContentLoaded', () => {
    cargarPedidos();
    cargarClientes();
  });
  
  async function cargarPedidos() {
    try {
      const response = await fetch('/api/pedidos');
      if (!response.ok) throw new Error('Error al cargar pedidos');
      const pedidos = await response.json();
  
      const pedidosTable = document.getElementById('pedidosTable').querySelector('tbody');
      pedidosTable.innerHTML = '';
  
      pedidos.forEach((pedido) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${pedido.id}</td>
          <td>${pedido.cliente?.razonSocial}</td>
          <td>${new Date(pedido.fechaPedido).toLocaleDateString()}</td>
          <td>${pedido.nroComprobante}</td>
          <td>${pedido.totalPedido}</td>
          <td>
            <button onclick="editarPedido(${pedido.id})">Editar</button>
            <button onclick="bajaPedido(${pedido.id})">Eliminar</button>
            <button onclick="generarPDF(${pedido.id})">Generar PDF</button>
          </td>
        `;
        pedidosTable.appendChild(row);
      });
    } catch (error) {
      console.error('Error al cargar pedidos:', error);
    }
  }
  
  async function cargarClientes() {
    try {
      const response = await fetch('/api/clientes');
      if (!response.ok) throw new Error('Error al cargar clientes');
      const clientes = await response.json();
  
      const clienteSelect = document.getElementById('cliente');
      clientes.forEach((cliente) => {
        const option = document.createElement('option');
        option.value = cliente.id.toString();
        option.text = cliente.razonSocial;
        clienteSelect.appendChild(option);
      });
    } catch (error) {
      console.error('Error al cargar clientes:', error);
    }
  }