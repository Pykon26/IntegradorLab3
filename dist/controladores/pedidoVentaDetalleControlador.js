"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarDetallePedidoVenta = exports.modificarDetallePedidoVenta = exports.obtenerDetallesPedidoVenta = exports.crearDetallePedidoVenta = void 0;
const database_1 = require("../database");
//creo detalle
const crearDetallePedidoVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idpedidoVenta, idproducto, cantidad, subtotal } = req.body;
    try {
        const [result] = yield database_1.db.execute('INSERT INTO pedido_venta_detalle (idpedidoventa, idproducto, cantidad, subtotal) VALUES (?, ?, ?, ?)', [idpedidoVenta, idproducto, cantidad, subtotal]);
        res.status(201).json({ message: 'Detalle de pedido de venta creado', id: result.insertId });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear detalle de pedido de venta', error });
    }
});
exports.crearDetallePedidoVenta = crearDetallePedidoVenta;
//obtengo detalles de un pedido
const obtenerDetallesPedidoVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const [rows] = yield database_1.db.execute('SELECT * FROM pedido_venta_detalle WHERE idpedidoventa = ?', [id]);
        if (rows.length > 0) {
            res.status(200).json(rows);
        }
        else {
            res.status(404).json({ message: 'Detalles de pedido de venta no encontrados' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener detalles de pedido de venta', error });
    }
});
exports.obtenerDetallesPedidoVenta = obtenerDetallesPedidoVenta;
//modificar detalle
const modificarDetallePedidoVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { idproducto, cantidad, subtotal } = req.body;
    try {
        const [result] = yield database_1.db.execute('UPDATE pedido_venta_detalle SET idproducto = ?, cantidad = ?, subtotal = ? WHERE id = ?', [idproducto, cantidad, subtotal, id]);
        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Detalle de pedido de venta actualizado' });
        }
        else {
            res.status(404).json({ message: 'Detalle de pedido de venta no encontrado' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error al modificar detalle de pedido de venta', error });
    }
});
exports.modificarDetallePedidoVenta = modificarDetallePedidoVenta;
//eliminar detalle
const eliminarDetallePedidoVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const [result] = yield database_1.db.execute('DELETE FROM pedido_venta_detalle WHERE id = ?', [id]);
        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Detalle de pedido de venta eliminado' });
        }
        else {
            res.status(404).json({ message: 'Detalle de pedido de venta no encontrado' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar detalle de pedido de venta', error });
    }
});
exports.eliminarDetallePedidoVenta = eliminarDetallePedidoVenta;
