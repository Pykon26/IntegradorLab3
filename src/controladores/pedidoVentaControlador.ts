import { Request, Response } from 'express';
import { db } from '../database';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

export const crearPedidoVenta = async (req: Request, res: Response) => {
    const { idcliente, fechaPedido, nroComprobante, formaPago, observaciones,totalPedido } = req.body;
    try {
        const [result] = await db.execute<ResultSetHeader>(
            'INSERT INTO pedido_venta (idcliente, fechaPedido, nroComprobante, formaPago, observaciones, totalPedido) VALUES (?, ?, ?, ?, ?, ?)',
            [idcliente, fechaPedido, nroComprobante, formaPago, observaciones,totalPedido]
        );

        res.status(201).json({ message: 'Pedido de venta creado', id: result.insertId });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear pedido de venta', error });
    }
};

export const modificarPedidoVenta = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { idcliente, fechaPedido, nroComprobante, formaPago, observaciones, totalPedido } = req.body;

    try {
        const [result] = await db.execute<ResultSetHeader>(
            'UPDATE pedido_venta SET idcliente = ?, fechaPedido = ?, nroComprobante = ?, formaPago = ?, observaciones = ?, totalPedido = ? WHERE id = ?',
            [idcliente, fechaPedido, nroComprobante, formaPago, observaciones, totalPedido, id]
        );

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Pedido de venta actualizado' });
        } else {
            res.status(404).json({ message: 'Pedido de venta no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al modificar pedido de venta', error });
    }
};

export const eliminarPedidoVenta = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const [result] = await db.execute<ResultSetHeader>(
            'DELETE FROM pedido_venta WHERE id = ?',
            [id]
        );

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Pedido de venta eliminado' });
        } else {
            res.status(404).json({ message: 'Pedido de venta no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar pedido de venta', error });
    }
};

export const obtenerPedidoVenta = async (req: Request, res: Response) => {
    

    try {
        const [rows] = await db.execute<RowDataPacket[]>(
            'SELECT * FROM pedido_venta',
            
        );

        if (rows.length > 0) {
            res.status(200).json(rows);
        } else {
            res.status(404).json({ message: 'Pedido de venta no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener pedido de venta', error });
    }
};


export const buscarPedidoVentaNroComprobante = async (req: Request, res: Response) => {
    const { nroComprobante } = req.params;

    try {
        if (nroComprobante) {
            // Busca por número de comprobante
            const [rows] = await db.execute(
                'SELECT * FROM pedido_venta WHERE nroComprobante = ?',
                [nroComprobante]
            );

            // Verifica si rows tiene elementos (ya que ahora rows es un array)
            if (Array.isArray(rows) && rows.length > 0) {
                res.status(200).json(rows); // Retorna el resultado
            } else {
                res.status(404).json({ message: 'No se encontró el pedido con ese número de comprobante.' });
            }
        } else {
            res.status(400).json({ message: 'Debe proporcionar el número de comprobante.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al buscar el pedido de venta', error });
    }
};


export const buscarPedidoVentaPorFechas = async (req: Request, res: Response) => {
    const { fechaInicio, fechaFin } = req.query;

    try {
        if (fechaInicio && fechaFin) {
            // Busca por rango de fechas
            const [rows] = await db.execute(
                'SELECT * FROM pedido_venta WHERE fechaPedido BETWEEN ? AND ?',
                [fechaInicio, fechaFin]
            );

            // Verifica si rows tiene elementos (ya que ahora rows es un array)
            if (Array.isArray(rows) && rows.length > 0) {
                res.status(200).json(rows); // Retorna el resultado
            } else {
                res.status(404).json({ message: 'No se encontraron pedidos en ese rango de fechas.' });
            }
        } else {
            res.status(400).json({ message: 'Debe proporcionar fechaInicio y fechaFin.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al buscar pedidos de venta', error });
    }
};


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

export const obtenerPedidoVentaid = async (req: Request, res: Response) => {
    const { nroComprobante, idcliente } = req.params;  // Obtener ambos parámetros desde los parámetros de la URL

    try {
        const [rows] = await db.execute<RowDataPacket[]>(
            'SELECT id FROM pedido_venta WHERE nroComprobante = ? AND idcliente = ?',
            [nroComprobante, idcliente]  // Usar ambos valores en la consulta SQL
        );

        if (rows.length > 0) {
            res.status(200).json({ id: rows[0].id });  // Enviar solo el 'id' del pedido de venta
        } else {
            res.status(404).json({ message: 'Pedido de venta no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener pedido de venta', error });
    }
};


 export const ActualizarTotalPedido = async (req: Request, res: Response) => {
     const { totalPedido, id} = req.params;

     try {
         const [result] = await db.execute<ResultSetHeader>(
             'UPDATE pedido_venta SET  totalPedido = ? WHERE id = ?',
             [totalPedido, id]
         );

         if (result.affectedRows > 0) {
             res.status(200).json({ message: 'Total de pedido de venta actualizado' });
         } else {
             res.status(404).json({ message: 'Total de pedido de venta no encontrado' });
         }
     } catch (error) {
         res.status(500).json({ message: 'Error al modificar total de pedido de venta', error });
     }
 };


