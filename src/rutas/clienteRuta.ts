import express from 'express';
import {
    obtenerCliente
} from '../controladores/clienteControlador';

const router = express.Router();

//rutas para los metodos de pedidoVentaControlador.ts
router.get('/clientes', obtenerCliente);

export default router;
