import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import useProduct from '../../hooks/useProduct';
import { RiEmotionSadLine } from 'react-icons/ri';

const TableProduct = ({ toggleRegister }) => {
  const { productos, getNombreCategoria, deleteProduct } = useProduct();
  return productos && productos.length > 0 ? (
    <div className="w-full">
      <div className="flex justify-end">
        <button
          className="flex items-center gap-2 px-5 py-2 bg-green-700 text-white mb-3 rounded-lg"
          onClick={toggleRegister}
        >
          <FaPlus />
          Agregar
        </button>
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-5">
                Nombre
              </th>
              <th scope="col" className="px-6 py-5">
                Precio
              </th>
              <th scope="col" className="px-6 py-5">
                Categoría
              </th>
              <th scope="col" className="px-6 py-5">
                Imagen
              </th>
              <th scope="col" className="px-6 py-5">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {productos.map((currentProducto) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={currentProducto.id}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {currentProducto.nombre}
                </th>
                <td className="px-6 py-4">
                  ${currentProducto.precio.toFixed(2)}
                </td>
                <td className="px-6 py-4">
                  {getNombreCategoria(currentProducto.CategoryId)}
                </td>
                <td className="px-6 py-4">
                  <div className="relative w-40 h-40">
                    <img
                      src={currentProducto.imagen}
                      alt=""
                      className="absolute w-full h-full object-cover"
                    />
                  </div>
                </td>
                <td className="px-6 py-4 flex items-center gap-2">
                  <button className="px-3 py-2 border bg-yellow-600 text-white border-yellow-600 rounded-lg">
                    <FaEdit />
                  </button>
                  <button
                    className="px-3 py-2 border bg-red-600 text-white border-red-600 rounded-lg"
                    onClick={() => deleteProduct(currentProducto.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <div className="flex h-96 flex-col justify-center items-center">
      <RiEmotionSadLine size={90} />
      <p className="text-2xl font-bold">No hay productos agregados.</p>
    </div>
  );
};

export default TableProduct;
