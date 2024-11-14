export class PedidoVentaDetalle {
    id: number;
    idpedidoventa: number;
    idproducto: number;
    cantidad: number;
    subtotal: number;
  
    constructor(id: number, idpedidoventa: number, idproducto: number, cantidad: number, subtotal: number) {
      this.id = id;
      this.idpedidoventa = idpedidoventa;
      this.idproducto = idproducto;
      this.cantidad = cantidad;
      this.subtotal = subtotal;
    }
  }