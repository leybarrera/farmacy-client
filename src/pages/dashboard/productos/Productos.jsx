import { useEffect, useState } from "react";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { productoEndpoints } from "../../../api/productos.api";
import Swal from "sweetalert2";
import { categoriaEndpoints } from "../../../api/categorias.api";
import { categories } from "../../../mocks/data";
const Productos = () => {
  const initialState = {
    nombre: "",
    precio: "",
    imagen: "",
    CategoryId: "",
  };
  const [showRegister, setShowRegister] = useState(false);
  const [producto, setProducto] = useState(initialState);
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const toggleRegister = () => setShowRegister(!showRegister);

  const fetchCategorias = () => {
    setCategorias(categories);
  };
  const fetchProductos = () => {
    const productsDB = [];
    for (let category of categories) {
      const { products } = category;
      if (products && products.length > 0) {
        for (let product of products) {
          productsDB.push({
            id: product.id,
            nombre: product.name,
            precio: product.price,
            CategoryId: category.id,
            imagen: product.poster,
          });
        }
      }
    }

    setProductos(productsDB);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({
      ...producto,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(producto);
    if (!Object.values(producto).some((current) => current == "")) {
      try {
        productoEndpoints
          .register(producto)
          .then(() => {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Producto registrado",
              showConfirmButton: false,
              timer: 1500,
            });

            setProducto(initialState);
            fetchProductos();
            toggleRegister();
          })
          .catch(console.log);
      } catch (error) {
        Swal.fire({
          title: "¡Error!",
          text: error.response.data.message,
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    } else {
      Swal.fire({
        title: "¡Error!",
        text: "Todos los campos son obligatorios",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  const deleteProduct = (id) => {
    Swal.fire({
      title: "¿Estas seguro de eliminar a este producto?",
      showDenyButton: true,
      confirmButtonText: "Sí, Eliminar",
      denyButtonText: `No eliminar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        productoEndpoints
          .borrar(id)
          .then(() => {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Producto eliminado con éxito",
              showConfirmButton: false,
              timer: 1500,
            });

            fetchProductos();
          })
          .catch(console.log);
      }
    });
  };

  const getNombreCategoria = (id) => {
    const foundCategoria = categories.find((current) => current.id == id);
    return foundCategoria.name;
  };

  useEffect(() => {
    fetchCategorias();
    fetchProductos();
  }, []);
  return (
    <main className="w-4/5 mx-auto py-5">
      <h2 className="uppercase text-3xl font-bold text-center">
        Gestión de Productos
      </h2>

      <div className="flex flex-col gap-3 mt-5">
        {showRegister ? (
          <div className="w-3/5 mx-auto">
            <form
              action=""
              className="w-full flex flex-col gap-3"
              onSubmit={handleSubmit}
            >
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-1">
                  <label htmlFor="" className="text-lg font-bold">
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    id="nombre"
                    onChange={handleChange}
                    value={producto.nombre}
                    className="px-2 py-3 border border-gray-500/30 outline-none focus:border-gray-500/50 rounded-lg"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="" className="text-lg font-bold">
                    Precio
                  </label>
                  <input
                    type="number"
                    name="precio"
                    id="precio"
                    onChange={handleChange}
                    value={producto.precio}
                    className="px-2 py-3 border border-gray-500/30 outline-none focus:border-gray-500/50 rounded-lg"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="" className="text-lg font-bold">
                  Categoría
                </label>
                <select
                  name="CategoryId"
                  id="CategoryId"
                  onChange={handleChange}
                  className="px-2 py-3 border border-gray-500/30 outline-none focus:border-gray-500/50 rounded-lg"
                >
                  <option selected disabled>
                    Seleccione la categoria
                  </option>
                  {categorias.map((currentCategoria) => (
                    <option
                      value={currentCategoria.id}
                      key={currentCategoria.id}
                    >
                      {currentCategoria.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="" className="text-lg font-bold">
                  Imagen
                </label>
                <input
                  type="url"
                  name="imagen"
                  id="imagen"
                  value={producto.imagen}
                  onChange={handleChange}
                  className="px-2 py-3 border border-gray-500/30 outline-none focus:border-gray-500/50 rounded-lg bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  className="text-center py-3 text-lg bg-primary text-white uppercase font-bold hover:bg-neutral-800  transition-colors duration-300"
                  onClick={toggleRegister}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="text-center py-3 text-lg bg-green-600 text-white uppercase font-bold hover:bg-green-700  transition-colors duration-300"
                >
                  Registrar
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="w-full ">
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
                        <div className="relative w-10 h-10">
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
        )}
      </div>
    </main>
  );
};

export default Productos;
