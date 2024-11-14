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
exports.obtenerProductos = void 0;
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
