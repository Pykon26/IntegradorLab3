export class PedidoVenta {
    id: number;
    idcliente: number;
    fechaPedido: Date;
    nroComprobante: number;
    formaPago: string;
    observaciones: string;
    totalPedido: number;
  
    constructor(id: number, idcliente: number, fechaPedido: Date, nroComprobante: number, formaPago: string, observaciones: string, totalPedido: number) {
      this.id = id;
      this.idcliente = idcliente;
      this.fechaPedido = fechaPedido;
      this.nroComprobante = nroComprobante;
      this.formaPago = formaPago;
      this.observaciones = observaciones;
      this.totalPedido = totalPedido;
    }
  }