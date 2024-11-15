import express from 'express';
import {
    crearPedidoVenta,
    modificarPedidoVenta,
    eliminarPedidoVenta,
    obtenerPedidoVenta,
    buscarPedidoVentaNroComprobante,
    buscarPedidoVentaPorFechas,
    obtenerPedidoVentaid,
    ActualizarTotalPedido,
    obtenerPedidoVentaId
    
} from '../controladores/pedidoVentaControlador';

const router = express.Router();

//rutas para los metodos de pedidoVentaControlador.ts
router.post('/pedido_venta', crearPedidoVenta);
router.put('/pedido_venta/:id', modificarPedidoVenta);
router.get('/pedido_venta/:id', obtenerPedidoVentaId);
router.delete('/pedido_venta/:id', eliminarPedidoVenta);
router.get('/pedido_venta', obtenerPedidoVenta);
router.get('/pedido_venta/buscar/:nroComprobante', buscarPedidoVentaNroComprobante);

router.get('/pedido_venta/buscar', buscarPedidoVentaPorFechas);

router.get('/pedido_venta/:nroComprobante/:idcliente', obtenerPedidoVentaid);
router.put('/pedido_venta/:id/actualizar-total/:totalPedido', ActualizarTotalPedido);

export default router;
