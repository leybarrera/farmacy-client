import { instance } from "./base.api";
const model = "usuarios";

export const usuarioEndpoints = {
  getAllUsuarios: () => {
    return instance.get(`${model}`);
  },

  getDeletedUsuarios: () => {
    return instance.get(`${model}/all`);
  },

  login: (credentials) => {
    return instance.post(`${model}/login`, { ...credentials });
  },

  register: (data) => {
    return instance.post(`${model}`, { ...data });
  },

  borrar: (id) => {
    return instance.delete(`${model}/delete/${id}`);
  },

  recuperar: (id) => {
    return instance.patch(`${model}/recovery/${id}`);
  },
};
