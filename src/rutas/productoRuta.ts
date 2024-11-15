import express from 'express';
import {
    obtenerProductos,
    obtenerProductoPrecioid
} from '../controladores/productoControlador';

const router = express.Router();

//rutas para los metodos de pedidoVentaControlador.ts
router.get('/productos', obtenerProductos);
router.get('/productos/:id',obtenerProductoPrecioid);

export default router;
