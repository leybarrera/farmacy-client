import { useEffect, useState } from "react";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { productoEndpoints } from "../../../api/productos.api";
import { ventaEndpoints } from "../../../api/ventas.api";
import Swal from "sweetalert2";

const Ventas = () => {
  const initialState = {
    ProductId: "",
    cantidad: "",
    cedula: "",
    fecha: "",
  };
  const [venta, setVenta] = useState(initialState);
  const [productos, setProductos] = useState([]);
  const [ventas, setVentas] = useState([]);
  const [showRegister, setShowRegister] = useState(false);
  const toggleRegister = () => setShowRegister(!showRegister);

  const fetchProductos = () => {
    productoEndpoints
      .getAllProductos()
      .then((res) => {
        console.log(res.data);
        setProductos(res.data.productos);
      })
      .catch(console.log);
  };

  const fetchVentas = () => {
    ventaEndpoints
      .getAllVentas()
      .then((res) => {
        console.log(res.data);
        setVentas(res.data.ventas);
      })
      .catch(console.log);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVenta({
      ...venta,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!Object.values(venta).some((current) => current == "")) {
      try {
        ventaEndpoints
          .register(venta)
          .then(() => {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Venta registrada",
              showConfirmButton: false,
              timer: 1500,
            });

            setVenta(initialState);
            fetchVentas();
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

  const getNombreProducto = (id) => {
    const foundProducto = productos.find((current) => current.id == id);
    return foundProducto.nombre;
  };

  const deleteVenta = (id) => {
    Swal.fire({
      title: "¿Estas seguro de eliminar a esta venta?",
      showDenyButton: true,
      confirmButtonText: "Sí, Eliminar",
      denyButtonText: `No eliminar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        ventaEndpoints
          .borrar(id)
          .then(() => {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Venta eliminada con éxito",
              showConfirmButton: false,
              timer: 1500,
            });

            fetchVentas();
          })
          .catch(console.log);
      }
    });
  };

  useEffect(() => {
    fetchVentas();
    fetchProductos();
  }, []);
  return (
    <main className="w-4/5 mx-auto py-5">
      <h2 className="uppercase text-3xl font-bold text-center">
        Gestión de Ventas
      </h2>

      <div className="flex flex-col gap-3 mt-5">
        {showRegister ? (
          <div className="w-3/5 mx-auto">
            <form
              action=""
              className="w-full flex flex-col gap-3"
              onSubmit={handleSubmit}
            >
              <div className="grid gap-2">
                <div className="flex flex-col gap-1">
                  <label htmlFor="" className="text-lg font-bold">
                    Producto
                  </label>
                  <select
                    name="ProductId"
                    id="ProductId"
                    onChange={handleChange}
                    className="px-2 py-3 border border-gray-500/30 outline-none focus:border-gray-500/50 rounded-lg"
                  >
                    <option disabled selected>
                      Selecciona un producto
                    </option>
                    {productos.map((currenProduct) => (
                      <option value={currenProduct.id} key={currenProduct.id}>
                        {currenProduct.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="" className="text-lg font-bold">
                    Cantidad
                  </label>
                  <input
                    type="number"
                    name="cantidad"
                    id="cantidad"
                    onChange={handleChange}
                    value={venta.cantidad}
                    className="px-2 py-3 border border-gray-500/30 outline-none focus:border-gray-500/50 rounded-lg"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="" className="text-lg font-bold">
                    Fecha
                  </label>
                  <input
                    type="date"
                    name="fecha"
                    id="fecha"
                    onChange={handleChange}
                    value={venta.fecha}
                    className="px-2 py-3 border border-gray-500/30 outline-none focus:border-gray-500/50 rounded-lg"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="" className="text-lg font-bold">
                    Cédula Cliente
                  </label>
                  <input
                    type="text"
                    name="cedula"
                    id="cedula"
                    onChange={handleChange}
                    value={venta.cedula}
                    className="px-2 py-3 border border-gray-500/30 outline-none focus:border-gray-500/50 rounded-lg"
                  />
                </div>
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
                      Producto
                    </th>
                    <th scope="col" className="px-6 py-5">
                      Cantidad
                    </th>
                    <th scope="col" className="px-6 py-5">
                      Fecha
                    </th>
                    <th scope="col" className="px-6 py-5">
                      Cedula
                    </th>

                    <th scope="col" className="px-6 py-5">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ventas.map((currentVenta) => (
                    <tr
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      key={currentVenta.id}
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {getNombreProducto(currentVenta.ProductId)}
                      </th>
                      <td className="px-6 py-4">{currentVenta.cantidad}</td>
                      <td className="px-6 py-4">{currentVenta.fecha}</td>
                      <td className="px-6 py-4">{currentVenta.cedula}</td>

                      <td className="px-6 py-4 flex items-center gap-2">
                        <button className="px-3 py-2 border bg-yellow-600 text-white border-yellow-600 rounded-lg">
                          <FaEdit />
                        </button>
                        <button
                          className="px-3 py-2 border bg-red-600 text-white border-red-600 rounded-lg"
                          onClick={() => deleteVenta(currentVenta.id)}
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

export default Ventas;
