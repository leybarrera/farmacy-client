import { instance } from './base.api';
const model = 'ventas';

export const ventaEndpoints = {
  getAllVentas: () => {
    return instance.get(`${model}`);
  },
  getVentaByUser: (UsuarioId) => {
    return instance.get(`${model}/venta/${UsuarioId}`);
  },

  register: (data) => {
    return instance.post(`${model}`, { ...data });
  },

  borrar: (id) => {
    return instance.delete(`${model}/delete/${id}`);
  },

  confirmarVenta: (to, name, UsuarioId, products) => {
    return instance.post(`${model}/`, { to, name, UsuarioId, products });
  },

  rechazarPago: (id) => {
    return instance.post(`${model}/voucher/rechazado/${id}`);
  },
  aceptarPago: (id) => {
    return instance.post(`${model}/voucher/aceptado/${id}`);
  },

  setVoucher: (image, id) => {
    return instance.post(`${model}/voucher`, { image, id });
  },
};
