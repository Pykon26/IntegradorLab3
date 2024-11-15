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
exports.ActualizarTotalPedido = exports.obtenerPedidoVentaid = exports.buscarPedidoVentaPorFechas = exports.buscarPedidoVentaNroComprobante = exports.obtenerPedidoVenta = exports.eliminarPedidoVenta = exports.modificarPedidoVenta = exports.crearPedidoVenta = void 0;
const database_1 = require("../database");
const crearPedidoVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idcliente, fechaPedido, nroComprobante, formaPago, observaciones, totalPedido } = req.body;
    try {
        const [result] = yield database_1.db.execute('INSERT INTO pedido_venta (idcliente, fechaPedido, nroComprobante, formaPago, observaciones, totalPedido) VALUES (?, ?, ?, ?, ?, ?)', [idcliente, fechaPedido, nroComprobante, formaPago, observaciones, totalPedido]);
        res.status(201).json({ message: 'Pedido de venta creado', id: result.insertId });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear pedido de venta', error });
    }
});
exports.crearPedidoVenta = crearPedidoVenta;
const modificarPedidoVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { idcliente, fechaPedido, nroComprobante, formaPago, observaciones, totalPedido } = req.body;
    try {
        const [result] = yield database_1.db.execute('UPDATE pedido_venta SET idcliente = ?, fechaPedido = ?, nroComprobante = ?, formaPago = ?, observaciones = ?, totalPedido = ? WHERE id = ?', [idcliente, fechaPedido, nroComprobante, formaPago, observaciones, totalPedido, id]);
        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Pedido de venta actualizado' });
        }
        else {
            res.status(404).json({ message: 'Pedido de venta no encontrado' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error al modificar pedido de venta', error });
    }
});
exports.modificarPedidoVenta = modificarPedidoVenta;
const eliminarPedidoVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const [result] = yield database_1.db.execute('DELETE FROM pedido_venta WHERE id = ?', [id]);
        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Pedido de venta eliminado' });
        }
        else {
            res.status(404).json({ message: 'Pedido de venta no encontrado' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar pedido de venta', error });
    }
});
exports.eliminarPedidoVenta = eliminarPedidoVenta;
const obtenerPedidoVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield database_1.db.execute('SELECT * FROM pedido_venta');
        if (rows.length > 0) {
            res.status(200).json(rows);
        }
        else {
            res.status(404).json({ message: 'Pedido de venta no encontrado' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener pedido de venta', error });
    }
});
exports.obtenerPedidoVenta = obtenerPedidoVenta;
const buscarPedidoVentaNroComprobante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nroComprobante } = req.params;
    try {
        if (nroComprobante) {
            // Busca por número de comprobante
            const [rows] = yield database_1.db.execute('SELECT * FROM pedido_venta WHERE nroComprobante = ?', [nroComprobante]);
            // Verifica si rows tiene elementos (ya que ahora rows es un array)
            if (Array.isArray(rows) && rows.length > 0) {
                res.status(200).json(rows); // Retorna el resultado
            }
            else {
                res.status(404).json({ message: 'No se encontró el pedido con ese número de comprobante.' });
            }
        }
        else {
            res.status(400).json({ message: 'Debe proporcionar el número de comprobante.' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error al buscar el pedido de venta', error });
    }
});
exports.buscarPedidoVentaNroComprobante = buscarPedidoVentaNroComprobante;
const buscarPedidoVentaPorFechas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fechaInicio, fechaFin } = req.query;
    try {
        if (fechaInicio && fechaFin) {
            // Busca por rango de fechas
            const [rows] = yield database_1.db.execute('SELECT * FROM pedido_venta WHERE fechaPedido BETWEEN ? AND ?', [fechaInicio, fechaFin]);
            // Verifica si rows tiene elementos (ya que ahora rows es un array)
            if (Array.isArray(rows) && rows.length > 0) {
                res.status(200).json(rows); // Retorna el resultado
            }
            else {
                res.status(404).json({ message: 'No se encontraron pedidos en ese rango de fechas.' });
            }
        }
        else {
            res.status(400).json({ message: 'Debe proporcionar fechaInicio y fechaFin.' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error al buscar pedidos de venta', error });
    }
});
exports.buscarPedidoVentaPorFechas = buscarPedidoVentaPorFechas;
// export const buscarPedidoVenta = async (req: Request, res: Response) => {
//     const { nroComprobante, fechaInicio, fechaFin } = req.query;
//     try {
//         if (nroComprobante) {
//             //busca por numero de comprobante
//             const [rows] = await db.execute(
//                 'SELECT * FROM pedido_venta WHERE nroComprobante = ?',
//                 [nroComprobante]
//             );
//             res.status(200).json(rows);
//         } else if (fechaInicio && fechaFin) {
//             //busca por rango de fecha
//             const [rows] = await db.execute(
//                 'SELECT * FROM pedido_venta WHERE fechaPedido BETWEEN ? AND ?',
//                 [fechaInicio, fechaFin]
//             );
//             res.status(200).json(rows);
//         } else {
//             res.status(400).json({ message: 'Debe proporcionar nroComprobante o fechaInicio y fechaFin' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: 'Error al buscar pedidos de venta', error });
//     }
// };
const obtenerPedidoVentaid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nroComprobante, idcliente } = req.params; // Obtener ambos parámetros desde los parámetros de la URL
    try {
        const [rows] = yield database_1.db.execute('SELECT id FROM pedido_venta WHERE nroComprobante = ? AND idcliente = ?', [nroComprobante, idcliente] // Usar ambos valores en la consulta SQL
        );
        if (rows.length > 0) {
            res.status(200).json({ id: rows[0].id }); // Enviar solo el 'id' del pedido de venta
        }
        else {
            res.status(404).json({ message: 'Pedido de venta no encontrado' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener pedido de venta', error });
    }
});
exports.obtenerPedidoVentaid = obtenerPedidoVentaid;
const ActualizarTotalPedido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { totalPedido, id } = req.params;
    try {
        const [result] = yield database_1.db.execute('UPDATE pedido_venta SET  totalPedido = ? WHERE id = ?', [totalPedido, id]);
        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Total de pedido de venta actualizado' });
        }
        else {
            res.status(404).json({ message: 'Total de pedido de venta no encontrado' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error al modificar total de pedido de venta', error });
    }
});
exports.ActualizarTotalPedido = ActualizarTotalPedido;
