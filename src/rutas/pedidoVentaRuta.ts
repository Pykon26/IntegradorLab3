import express from 'express';
import {
    crearPedidoVenta,
    modificarPedidoVenta,
    eliminarPedidoVenta,
    obtenerPedidoVenta,
    buscarPedidoVenta,
} from '../controladores/pedidoVentaControlador';

const router = express.Router();

//rutas para los metodos de pedidoVentaControlador.ts
router.post('/pedido_venta', crearPedidoVenta);
router.put('/pedido_venta/:id', modificarPedidoVenta);
router.delete('/pedido_venta/:id', eliminarPedidoVenta);
router.get('/pedido_venta/:id', obtenerPedidoVenta);
router.get('/pedido_venta/buscar', buscarPedidoVenta);

export default router;
