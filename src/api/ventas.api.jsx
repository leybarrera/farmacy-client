import { instance } from "./base.api";
const model = "ventas";

export const ventaEndpoints = {
  getAllVentas: () => {
    return instance.get(`${model}`);
  },

  register: (data) => {
    return instance.post(`${model}`, { ...data });
  },

  borrar: (id) => {
    return instance.delete(`${model}/delete/${id}`);
  },

  confirmarVenta: (to, name, cart) => {
    return instance.post(`${model}/confirm`, { to, name, cart });
  },
};
