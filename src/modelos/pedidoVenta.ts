export class PedidoVenta {
    //id: number;
    idcliente: number;
    fechaPedido: Date;
    nroComprobante: number;
    formaPago: string;
    observaciones: string;
    //totalPedido: number;
  
    constructor(idcliente: number, fechaPedido: Date, nroComprobante: number, formaPago: string, observaciones: string) {
      //this.id = id;
      this.idcliente = idcliente;
      this.fechaPedido = fechaPedido;
      this.nroComprobante = nroComprobante;
      this.formaPago = formaPago;
      this.observaciones = observaciones;
      //this.totalPedido = totalPedido;
    }
  }