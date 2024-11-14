"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PedidoVenta = void 0;
class PedidoVenta {
    //totalPedido: number;
    constructor(idcliente, fechaPedido, nroComprobante, formaPago, observaciones) {
        //this.id = id;
        this.idcliente = idcliente;
        this.fechaPedido = fechaPedido;
        this.nroComprobante = nroComprobante;
        this.formaPago = formaPago;
        this.observaciones = observaciones;
        //this.totalPedido = totalPedido;
    }
}
exports.PedidoVenta = PedidoVenta;
