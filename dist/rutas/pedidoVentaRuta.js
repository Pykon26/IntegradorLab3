"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pedidoVentaControlador_1 = require("../controladores/pedidoVentaControlador");
const router = express_1.default.Router();

//rutas para los metodos de pedidoVentaControlador.ts
router.post('/pedido_venta', pedidoVentaControlador_1.crearPedidoVenta);
router.put('/pedido_venta/:id', pedidoVentaControlador_1.modificarPedidoVenta);
router.get('/pedido_venta/:id', pedidoVentaControlador_1.obtenerPedidoVentaId);
router.delete('/pedido_venta/:id', pedidoVentaControlador_1.eliminarPedidoVenta);
router.get('/pedido_venta', pedidoVentaControlador_1.obtenerPedidoVenta);
router.get('/pedido_venta/buscar/:nroComprobante', pedidoVentaControlador_1.buscarPedidoVentaNroComprobante);
router.get('/pedido_venta/buscar', pedidoVentaControlador_1.buscarPedidoVentaPorFechas);
router.get('/pedido_venta/:nroComprobante/:idcliente', pedidoVentaControlador_1.obtenerPedidoVentaid);
router.put('/pedido_venta/:id/actualizar-total/:totalPedido', pedidoVentaControlador_1.ActualizarTotalPedido);
exports.default = router;
