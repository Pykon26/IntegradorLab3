"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productoControlador_1 = require("../controladores/productoControlador");
const router = express_1.default.Router();

//rutas para los metodos de pedidoVentaControlador.ts
router.get('/productos', productoControlador_1.obtenerProductos);
router.get('/productos/:id', productoControlador_1.obtenerProductoPrecioid);
exports.default = router;
