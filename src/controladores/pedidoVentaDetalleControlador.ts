import { Request, Response } from 'express';
import { db } from '../database';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

//creo detalle
export const crearDetallePedidoVenta = async (req: Request, res: Response) => {
    const { idpedidoVenta, idproducto, cantidad, subtotal } = req.body;

    try {
        const [result] = await db.execute<ResultSetHeader>(
            'INSERT INTO pedido_venta_detalle (idpedidoventa, idproducto, cantidad, subtotal) VALUES (?, ?, ?, ?)',
            [idpedidoVenta, idproducto, cantidad, subtotal]
        );

        res.status(201).json({ message: 'Detalle de pedido de venta creado', id: result.insertId });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear detalle de pedido de venta', error });
    }
};

//obtengo detalles de un pedido
export const obtenerDetallesPedidoVenta = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const [rows] = await db.execute<RowDataPacket[]>(
            'SELECT * FROM pedido_venta_detalle WHERE idpedidoventa = ?',
            [id]
        );

        if (rows.length > 0) {
            res.status(200).json(rows);
        } else {
            res.status(404).json({ message: 'Detalles de pedido de venta no encontrados' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener detalles de pedido de venta', error });
    }
};

//modificar detalle
export const modificarDetallePedidoVenta = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { idproducto, cantidad, subtotal } = req.body;

    try {
        const [result] = await db.execute<ResultSetHeader>(
            'UPDATE pedido_venta_detalle SET idproducto = ?, cantidad = ?, subtotal = ? WHERE id = ?',
            [idproducto, cantidad, subtotal, id]
        );

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Detalle de pedido de venta actualizado' });
        } else {
            res.status(404).json({ message: 'Detalle de pedido de venta no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al modificar detalle de pedido de venta', error });
    }
};

//eliminar detalle
export const eliminarDetallePedidoVenta = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const [result] = await db.execute<ResultSetHeader>(
            'DELETE FROM pedido_venta_detalle WHERE id = ?',
            [id]
        );

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Detalle de pedido de venta eliminado' });
        } else {
            res.status(404).json({ message: 'Detalle de pedido de venta no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar detalle de pedido de venta', error });
    }
};
