import { useState } from 'react';
import storageUtils from '../../utils/storage.utils';
import { useEffect } from 'react';
import { ventaEndpoints } from '../../api/ventas.api';
import Swal from 'sweetalert2';

const Pagos = () => {
  const [pagos, setPagos] = useState([]);
  const [image, setImage] = useState('');
  const fetchPagos = () => {
    const usuario = storageUtils.getData('usuario');
    ventaEndpoints.getVentaByUser(usuario.id).then((res) => {
      setPagos(res.data.ventas);
    });
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  const saveVoucher = (id) => {
    ventaEndpoints
      .setVoucher(image, id)
      .then((res) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Comprobante registrado con éxito',
          showConfirmButton: false,
          timer: 1500,
        });

        fetchPagos();
      })
      .catch(console.log);
  };

  useEffect(() => {
    fetchPagos();
  }, []);
  return (
    <div>
      {pagos.length > 0 ? (
        <section className="lg:w-3/5 w-[90%] mx-auto py-10 flex flex-col justify-center items-center">
          <h2 className="text-3xl font-bold uppercase">Mis Pagos</h2>
          <div className="w-full overflow-x-auto mt-10">
            <table className="min-w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-5">
                    Fecha
                  </th>
                  <th scope="col" className="px-6 py-5">
                    Monto
                  </th>
                  <th scope="col" className="px-6 py-5">
                    Estado
                  </th>
                  <th scope="col" className="px-6 py-5">
                    Voucher
                  </th>
                  <th scope="col" className="px-6 py-5"></th>
                </tr>
              </thead>
              <tbody>
                {pagos.map((pago) => (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    key={pago.id}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {pago.fecha}
                    </th>
                    <td className="px-6 py-4">${pago.monto.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span className="px-1 py-1 bg-red-500 text-red-200 rounded-lg">
                        {pago.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {pago.voucher ? (
                        <div className="w-20 h-20 relative">
                          <img
                            src={pago.voucher}
                            alt="Pago"
                            className="absolute w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <input
                          type="file"
                          name="image"
                          id="image"
                          onChange={handleFileInputChange}
                        />
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        className="py-1 px-3 bg-green-700 text-green-200 rounded-lg"
                        onClick={() => saveVoucher(pago.id)}
                      >
                        Guardar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : (
        <h1>No hay pagos</h1>
      )}
    </div>
  );
};
export default Pagos;
