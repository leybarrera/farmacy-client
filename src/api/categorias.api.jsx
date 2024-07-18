import { instance } from './base.api';
const model = 'categorias';

export const categoriaEndpoints = {
  getAllCategorias: () => {
    return instance.get(`${model}`);
  },

  register: (data) => {
    return instance.post(`${model}`, { ...data });
  },

  borrar: (id) => {
    return instance.delete(`${model}/delete/${id}`);
  },
};
