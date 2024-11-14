"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const clienteControlador_1 = require("../controladores/clienteControlador");
const router = express_1.default.Router();
//rutas para los metodos de pedidoVentaControlador.ts
router.get('/clientes', clienteControlador_1.obtenerCliente);
router.get('/clientes/:id', clienteControlador_1.obtenerClienteid);
exports.default = router;
