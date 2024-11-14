import { Request, Response } from 'express';
import express from 'express';
import pedidoVentaRutas from './rutas/pedidoVentaRuta';
import pedidoVentaDetalleRuta from './rutas/pedidoVentaDetalleRuta';
import clienteRuta from './rutas/clienteRuta';
import productoRuta from './rutas/productoRuta';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req: Request, res: Response) => {
    res.send('Servidor Node.js y Express funcionando');
}); //pagina de prueba para ver si se contecta al puerto 3000

//rutas para poder manejar las consultas
app.use('/api', pedidoVentaRutas);
app.use('/api', pedidoVentaDetalleRuta);
app.use('/api', clienteRuta);
app.use('/api', productoRuta);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
