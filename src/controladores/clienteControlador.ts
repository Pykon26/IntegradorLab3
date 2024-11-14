import { Request, Response } from 'express';
import { db } from '../database';
import {RowDataPacket } from 'mysql2';

export const obtenerCliente = async (req: Request, res: Response) => {
    
    try {
        const [rows] = await db.execute<RowDataPacket[]>(
            'SELECT * FROM cliente',
            
        );

        if (rows.length > 0) {
            res.status(200).json(rows);
        } else {
            res.status(404).json({ message: 'Clientes vacios' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener clientes', error });
    }
};

