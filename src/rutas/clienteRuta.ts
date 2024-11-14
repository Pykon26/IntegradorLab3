import express from 'express';
import {
    obtenerCliente,
    obtenerClienteid
} from '../controladores/clienteControlador';

const router = express.Router();

//rutas para los metodos de pedidoVentaControlador.ts
router.get('/clientes', obtenerCliente);
router.get('/clientes/:id', obtenerClienteid);

export default router;
