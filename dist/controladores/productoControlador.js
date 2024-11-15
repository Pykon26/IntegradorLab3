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
exports.obtenerProductoPrecioid = exports.obtenerProductos = void 0;
const database_1 = require("../database");
const obtenerProductos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield database_1.db.execute('SELECT * FROM producto');
        if (rows.length > 0) {
            res.status(200).json(rows);
        }
        else {
            res.status(404).json({ message: 'productos vacios' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener productos', error });
    }
});
exports.obtenerProductos = obtenerProductos;
const obtenerProductoPrecioid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const [rows] = yield database_1.db.execute('SELECT precioVenta FROM producto WHERE id = ? ', [id]);
        if (rows.length > 0) {
            const precioVenta = rows[0].precioVenta;
            res.status(200).json({ precioVenta });
        }
        else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener producto', error });
    }
});
exports.obtenerProductoPrecioid = obtenerProductoPrecioid;
