import { instance } from "./base.api";
const model = "productos";

export const productoEndpoints = {
  getAllProductos: () => {
    return instance.get(`${model}`);
  },

  register: (data) => {
    return instance.post(`${model}`, { ...data });
  },

  borrar: (id) => {
    return instance.delete(`${model}/delete/${id}`);
  },
};
