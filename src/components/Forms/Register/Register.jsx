import { FaEye, FaEyeSlash } from 'react-icons/fa';
import useRegister from '../../../hooks/useRegister';

const FormRegister = () => {
  const { handleChange, handleSubmit, showPassword, togglePassword, user } =
    useRegister();
  return (
    <form
      action=""
      className="w-full flex flex-col gap-3"
      onSubmit={handleSubmit}
    >
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="" className="text-lg font-bold">
            Nombre
          </label>
          <input
            type="text"
            name="nombre"
            id="nombre"
            onChange={handleChange}
            value={user.nombre}
            className="px-2 py-3 border border-gray-500/30 outline-none focus:border-gray-500/50 rounded-lg"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="" className="text-lg font-bold">
            Apellido
          </label>
          <input
            type="text"
            name="apellido"
            id="apellido"
            onChange={handleChange}
            value={user.apellido}
            className="px-2 py-3 border border-gray-500/30 outline-none focus:border-gray-500/50 rounded-lg"
          />
        </div>
      </div>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="" className="text-lg font-bold">
            Correo electrónico
          </label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={handleChange}
            value={user.email}
            className="px-2 py-3 border border-gray-500/30 outline-none focus:border-gray-500/50 rounded-lg"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="" className="text-lg font-bold">
            Cédula
          </label>
          <input
            type="text"
            name="cedula"
            id="cedula"
            onChange={handleChange}
            value={user.cedula}
            className="px-2 py-3 border border-gray-500/30 outline-none focus:border-gray-500/50 rounded-lg"
          />
        </div>
      </div>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="" className="text-lg font-bold">
            Fecha de Nacimiento
          </label>
          <input
            type="date"
            name="fecha_nacimiento"
            id="fecha_nacimiento"
            onChange={handleChange}
            value={user.fecha_nacimiento}
            className="px-2 py-3 border border-gray-500/30 outline-none focus:border-gray-500/50 rounded-lg"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="" className="text-lg font-bold">
            Contraseña
          </label>
          <div className="border border-gray-500/30 rounded-lg flex justify-between overflow-hidden focus-within:border-gray-500/50">
            <input
              type={showPassword ? 'text' : 'password'}
              name="contraseña"
              id="contraseña"
              value={user.contraseña}
              onChange={handleChange}
              className="px-2 py-3 outline-none w-full"
            />
            <button
              type="button"
              onClick={togglePassword}
              className="w-12 flex items-center justify-center"
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="" className="text-lg font-bold">
            Sexo
          </label>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="sexo"
                onChange={handleChange}
                value="male"
              />
              <label htmlFor="">Hombre</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="sexo"
                onChange={handleChange}
                value="female"
              />
              <label htmlFor="">Mujer</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="sexo"
                onChange={handleChange}
                value="custom"
              />
              <label htmlFor="">Personalizado</label>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-primary py-2 px-3 text-white text-justify text-sm">
        <h5>
          Es posible que las personas que usan nuestro servicio hayan subido tu
          información de contacto a BuenaSalud. Obtén más información. Al hacer
          clic en <strong> Registrarte</strong>, aceptas nuestras Condiciones,
          la Política de privacidad y la Política de cookies. Es posible que te
          enviemos notificaciones por SMS, que puedes desactivar cuando quieras.
        </h5>
      </div>

      <button
        type="submit"
        className="text-center py-3 text-lg bg-green-600 text-white uppercase font-bold hover:bg-green-700  transition-colors duration-300"
      >
        Registrar
      </button>
    </form>
  );
};
export default FormRegister;
