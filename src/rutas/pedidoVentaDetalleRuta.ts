import { Router } from 'express';
import {
    crearDetallePedidoVenta,
    obtenerDetallesPedidoVenta,
    modificarDetallePedidoVenta,
    eliminarDetallePedidoVenta
} from '../controladores/pedidoVentaDetalleControlador';

const router = Router();

router.post('/pedido_venta_detalle', crearDetallePedidoVenta);
router.get('/pedido_venta_detalle/:id', obtenerDetallesPedidoVenta);
router.put('/pedido_venta_detalle/:id', modificarDetallePedidoVenta);
router.delete('/pedido_venta_detalle/:id', eliminarDetallePedidoVenta);

export default router;
