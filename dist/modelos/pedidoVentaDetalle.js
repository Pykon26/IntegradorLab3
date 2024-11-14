"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PedidoVentaDetalle = void 0;
class PedidoVentaDetalle {
    constructor(id, idpedidoventa, idproducto, cantidad, subtotal) {
        this.id = id;
        this.idpedidoventa = idpedidoventa;
        this.idproducto = idproducto;
        this.cantidad = cantidad;
        this.subtotal = subtotal;
    }
}
exports.PedidoVentaDetalle = PedidoVentaDetalle;
