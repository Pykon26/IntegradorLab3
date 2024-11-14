"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pedidoVentaRuta_1 = __importDefault(require("./rutas/pedidoVentaRuta"));
const pedidoVentaDetalleRuta_1 = __importDefault(require("./rutas/pedidoVentaDetalleRuta"));
const clienteRuta_1 = __importDefault(require("./rutas/clienteRuta"));
const productoRuta_1 = __importDefault(require("./rutas/productoRuta"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
app.use(express_1.default.static('public'));
app.get('/', (req, res) => {
    res.send('Servidor Node.js y Express funcionando');
}); //pagina de prueba para ver si se contecta al puerto 3000
//rutas para poder manejar las consultas
app.use('/api', pedidoVentaRuta_1.default);
app.use('/api', pedidoVentaDetalleRuta_1.default);
app.use('/api', clienteRuta_1.default);
app.use('/api', productoRuta_1.default);
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
