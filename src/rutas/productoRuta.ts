import express from 'express';
import {
    obtenerProductos
} from '../controladores/productoControlador';

const router = express.Router();

//rutas para los metodos de pedidoVentaControlador.ts
router.get('/productos', obtenerProductos);

export default router;
