import { useEffect, useState } from 'react';
import { FaCheck, FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { productoEndpoints } from '../../../api/productos.api';
import { ventaEndpoints } from '../../../api/ventas.api';
import Swal from 'sweetalert2';
import { usuarioEndpoints } from '../../../api/usuarios.api';
import { MdCancel } from 'react-icons/md';
import { RiEmotionSadLine } from 'react-icons/ri';

const Ventas = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [ventas, setVentas] = useState([]);
  const fetchUsuarios = () => {
    usuarioEndpoints
      .getAllUsuarios()
      .then((res) => {
        setUsuarios(res.data.usuarios);
      })
      .catch(console.log);
  };

  const fetchVentas = () => {
    ventaEndpoints
      .getAllVentas()
      .then((res) => {
        setVentas(res.data.ventas);
      })
      .catch(console.log);
  };

  const getNombreProducto = (id) => {
    const foundUsuario = usuarios.find((current) => current.id == id);
    return foundUsuario.nombre + ' ' + foundUsuario.apellido;
  };

  const rejectVoucher = (id) => {
    ventaEndpoints
      .rechazarPago(id)
      .then((res) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: res.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: err.response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .finally(() => {
        fetchVentas();
      });
  };
  const confirmVoucher = (id) => {
    ventaEndpoints
      .aceptarPago(id)
      .then((res) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: res.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: err.response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .finally(() => {
        fetchVentas();
      });
  };

  const getClasses = (status) => {
    let classes = 'px-3 py-1 rounded-lg ';
    switch (status) {
      case 'Pendiente':
        classes += 'bg-gray-700 text-gray-500';
        break;
      case 'Procesando':
        classes += 'bg-teal-800 text-teal-500';
        break;
      case 'Rechazado':
        classes += 'bg-red-800 text-red-200';
        break;
      case 'Pagado':
        classes += 'bg-green-800 text-green-400';
        break;
    }
    return classes;
  };

  useEffect(() => {
    fetchVentas();
    fetchUsuarios();
  }, []);
  return (
    <main className="w-full py-5">
      <h2 className="uppercase text-3xl font-bold text-center">
        Gestión de Ventas
      </h2>
      {usuarios.length > 0 ? (
        <div className="flex flex-col gap-3 mt-5">
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-5">
                    Fecha
                  </th>
                  <th scope="col" className="px-6 py-5">
                    Monto
                  </th>
                  <th scope="col" className="px-6 py-5">
                    Usuario
                  </th>
                  <th scope="col" className="px-6 py-5">
                    Voucher
                  </th>
                  <th scope="col" className="px-6 py-5">
                    Estado
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
                      {currentVenta.fecha}
                    </th>
                    <td className="px-6 py-4">
                      ${currentVenta.monto.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      {getNombreProducto(currentVenta.UsuarioId)}
                    </td>
                    <td className="px-6 py-4">
                      {currentVenta.voucher ? (
                        <div className="relative w-20 h-20">
                          <img
                            src={currentVenta.voucher}
                            className="absolute w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <span>No voucher</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={getClasses(currentVenta.status)}>
                        {currentVenta.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 flex items-center gap-2">
                      <button
                        className="px-3 py-2 border bg-green-800 text-white border-green-800 rounded-lg"
                        onClick={() => confirmVoucher(currentVenta.id)}
                      >
                        <FaCheck />
                      </button>
                      <button
                        className="px-3 py-2 border bg-red-600 text-white border-red-600 rounded-lg"
                        onClick={() => rejectVoucher(currentVenta.id)}
                      >
                        <MdCancel />
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
          <p className="text-2xl font-bold">No hay ventas asignadas.</p>
        </div>
      )}
    </main>
  );
};

export default Ventas;
