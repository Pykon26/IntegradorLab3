import express from 'express';
import {
    crearPedidoVenta,
    modificarPedidoVenta,
    eliminarPedidoVenta,
    obtenerPedidoVenta,
    buscarPedidoVenta,
    obtenerPedidoVentaid,
    ActualizarTotalPedido
    
} from '../controladores/pedidoVentaControlador';

const router = express.Router();

//rutas para los metodos de pedidoVentaControlador.ts
router.post('/pedido_venta', crearPedidoVenta);
router.put('/pedido_venta/:id', modificarPedidoVenta);
router.delete('/pedido_venta/:id', eliminarPedidoVenta);
router.get('/pedido_venta/:id', obtenerPedidoVenta);
router.get('/pedido_venta/buscar', buscarPedidoVenta);
router.get('/pedido_venta/:nroComprobante/:idcliente', obtenerPedidoVentaid);
router.put('/pedido_venta/:id/actualizar-total/:totalPedido', ActualizarTotalPedido);

export default router;
