"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pedidoVentaDetalleControlador_1 = require("../controladores/pedidoVentaDetalleControlador");
const router = (0, express_1.Router)();
router.post('/pedido_venta_detalle', pedidoVentaDetalleControlador_1.crearDetallePedidoVenta);
router.get('/pedido_venta_detalle/:id', pedidoVentaDetalleControlador_1.obtenerDetallesPedidoVenta);
router.put('/pedido_venta_detalle/:id', pedidoVentaDetalleControlador_1.modificarDetallePedidoVenta);
router.delete('/pedido_venta_detalle/:id', pedidoVentaDetalleControlador_1.eliminarDetallePedidoVenta);
router.get('/pedido_venta_detalle/subtotales/:id', pedidoVentaDetalleControlador_1.obtenerPedidoDetallesSubtotales);
exports.default = router;
