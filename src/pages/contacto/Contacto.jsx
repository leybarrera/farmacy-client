import { useState } from 'react';
import { messageEndpoint } from '../../api/message.api';
import Swal from 'sweetalert2';

const Contacto = () => {
  const initialState = {
    nombre: '',
    email: '',
    mensaje: '',
  };
  const [message, setMessage] = useState(initialState);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMessage({
      ...message,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!Object.values(message).some((current) => current == '')) {
      try {
        messageEndpoint
          .sendMessage(message)
          .then(() => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Mensaje enviado',
              showConfirmButton: false,
              timer: 1500,
            });

            setMessage(initialState);
          })
          .catch(console.log);
      } catch (error) {
        Swal.fire({
          title: '¡Error!',
          text: error.response.data.message,
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    } else {
      Swal.fire({
        title: '¡Error!',
        text: 'Todos los campos son obligatorios',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
  };
  return (
    <section className="py-2 lg:w-3/5 lg:px-0 mx-auto flex flex-col gap-5 items-center lg:border lg:border-white rounded-lg mt-4 bg-opacity-80 bg-dark">
      <div className="relative lg:w-40 lg:h-40 w-20 h-20 rounded-full overflow-hidden">
        <img
          src="contacto.webp"
          alt=""
          className="absolute w-full h-full object-cover"
        />
      </div>
      <div className="lg:w-4/5 w-[90%] mx-auto flex flex-col items-center gap-2 bg-white py-5 px-2 rounded-lg border border-white shadow-lg shadow-gray-300 my-10">
        <h3 className="lg:text-2xl text-lg font-bold uppercase mb-2">
          Información de Contacto
        </h3>

        <form
          action=""
          className="w-full flex flex-col gap-3"
          onSubmit={handleSubmit}
        >
          <div className="flex items-center flex-col lg:flex-row gap-2">
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="" className="lg:text-lg font-bold">
                Nombre Completo
              </label>
              <input
                type="text"
                name="nombre"
                id="nombre"
                value={message.nombre}
                onChange={handleChange}
                className="px-2 py-3 border border-gray-500/30 outline-none focus:border-gray-500/50 rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="" className="lg:text-lg font-bold">
                Correo electrónico
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={message.email}
                onChange={handleChange}
                className="px-2 py-3 border border-gray-500/30 outline-none focus:border-gray-500/50 rounded-lg"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="lg:text-lg font-bold">
              Mensaje
            </label>
            <textarea
              name="mensaje"
              id="mensaje"
              onChange={handleChange}
              value={message.mensaje}
              className="resize-none px-2 py-3 border border-gray-500/30 outline-none focus:border-gray-500/50 rounded-lg h-32"
            ></textarea>
          </div>

          <button
            type="submit"
            className="text-center py-3 lg:text-lg bg-green-600 text-white uppercase font-bold hover:bg-green-700  transition-colors duration-300"
          >
            Enviar
          </button>
        </form>
        <div className="lg:w-3/5 w-[90%] mx-auto flex flex-col gap-2 text-center">
          <h4>
            <strong>Dirección: </strong> Av. 19 De Mayo y Calavi, Cotopaxi,
            Ecuador
          </h4>
          <h4>
            <strong>Teléfono: </strong> +593 98 044 6167
          </h4>
          <h4>
            <strong>Email:</strong> nyellove1998@gmail.com
          </h4>
        </div>
      </div>
    </section>
  );
};

export default Contacto;
