import { useState } from 'react';
import { usuarioEndpoints } from '../../api/usuarios.api';
import Swal from 'sweetalert2';

const Modal = ({ toggleModal }) => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [disabled, setDisabled] = useState(true);
  const handleChange = (e) => {
    const { value } = e.target;
    setEmail(value);
  };
  const handleCode = (e) => {
    const { value } = e.target;
    setCode(value);
  };
  const handleContraseña = (e) => {
    const { value } = e.target;
    setContraseña(value);
  };

  const sendEmail = () => {
    if (email) {
      usuarioEndpoints
        .recuperarContraseña(email)
        .then((res) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: res.data.message,
            showConfirmButton: false,
            timer: 3500,
          });
        })
        .catch((err) => {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: err.responsee.data.message,
            showConfirmButton: false,
            timer: 3500,
          });
        });
    } else {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Debes ingresar tu email.',
        showConfirmButton: false,
        timer: 3500,
      });
    }
  };
  const sendCode = () => {
    if (email && code) {
      usuarioEndpoints
        .verificarCodigo(code, email)
        .then((res) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: res.data.message,
            showConfirmButton: false,
            timer: 3500,
          });
          setDisabled(false);
        })
        .catch((err) => {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: err.responsee.data.message,
            showConfirmButton: false,
            timer: 3500,
          });
        });
    } else {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Debes ingresar tu email y el código recibido.',
        showConfirmButton: false,
        timer: 3500,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && code && contraseña) {
      usuarioEndpoints
        .cambiarContraseña(email, contraseña)
        .then((res) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: res.data.message,
            showConfirmButton: false,
            timer: 3500,
          });
          toggleModal();
        })
        .catch((err) => {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: err.responsee.data.message,
            showConfirmButton: false,
            timer: 3500,
          });
        });
    } else {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Debes ingresar tu email, el código y la nueva contraseña.',
        showConfirmButton: false,
        timer: 3500,
      });
    }
  };

  return (
    <main className="absolute w-full h-full overflow-hidden top-0 left-0 bg-white/90 z-50 flex justify-center items-center">
      <button
        className="absolute top-2 right-5 px-3 py-2 bg-red-800 text-white rounded-lg hover:bg-red-700 transition-all duration-300"
        onClick={toggleModal}
      >
        X
      </button>
      <div className="lg:w-1/3 w-[90%] p-5 flex flex-col gap-10 bg-neutral-600 text-gray-300 rounded-lg">
        <h1 className="lg:text-3xl text-xl font-bold uppercase text-center">
          Recuperar contraseña
        </h1>

        <form
          action=""
          className="w-full flex flex-col gap-3"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="lg:text-lg font-bold">
              Correo electrónico
            </label>
            <input
              type="text"
              name="email"
              id="email"
              className="px-2 py-3 border border-gray-500/30 text-black outline-none focus:border-gray-500/50 rounded-lg"
              onChange={handleChange}
              disabled={!disabled}
            />
            <button
              type="button"
              className="text-center py-3 lg:text-lg text-sm bg-blue-600 text-white uppercase font-bold hover:bg-blue-700  transition-colors duration-300 mt-2"
              onClick={sendEmail}
              disabled={!disabled}
            >
              Enviar código
            </button>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="lg:text-lg font-bold">
              Código
            </label>
            <input
              type="text"
              name="codigo"
              id="codigo"
              className="px-2 py-3 border border-gray-500/30 outline-none text-black focus:border-gray-500/50 rounded-lg"
              onChange={handleCode}
              disabled={!disabled}
            />
            <button
              type="button"
              className="text-center py-3 lg:text-lg text-sm bg-blue-600 text-white uppercase font-bold hover:bg-blue-700  transition-colors duration-300 mt-2"
              onClick={sendCode}
              disabled={!disabled}
            >
              Verificar código
            </button>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="lg:text-lg font-bold">
              Nueva Contraseña
            </label>
            <input
              type="password"
              name="contraseña"
              id="contraseña"
              className="px-2 py-3 border border-gray-500/30 text-black outline-none focus:border-gray-500/50 rounded-lg"
              onChange={handleContraseña}
              disabled={disabled}
            />
          </div>

          <button
            type="submit"
            className="text-center py-3 lg:text-lg text-sm bg-green-600 text-white uppercase font-bold hover:bg-green-700 disabled:bg-green-700  transition-colors duration-300"
            disabled={disabled}
          >
            Cambiar contraseña
          </button>
        </form>
      </div>
    </main>
  );
};
export default Modal;
