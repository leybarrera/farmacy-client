import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Registro = () => {
  const [showPasword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(!showPasword);
  return (
    <section className="py-10 w-3/5 mx-auto flex flex-col gap-5 items-center border border-white rounded-lg mt-4 bg-opacity-80 bg-dark">
      <div className="relative w-52 h-52 rounded-full overflow-hidden">
        <img
          src="registro.webp"
          alt=""
          className="absolute w-full h-full object-cover"
        />
      </div>
      <div className="w-4/5 mx-auto flex flex-col items-center gap-2 bg-white py-5 px-10 rounded-lg border border-white shadow-lg shadow-gray-300">
        <h3 className="text-2xl font-bold uppercase">Crea una cuenta</h3>
        <h5 className="text-lg mb-10">Es rápido y fácil</h5>

        <form action="" className="w-full flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1">
              <label htmlFor="" className="text-lg font-bold">
                Nombre
              </label>
              <input
                type="text"
                name=""
                id=""
                className="px-2 py-3 border border-gray-500/30 outline-none focus:border-gray-500/50 rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="" className="text-lg font-bold">
                Apellido
              </label>
              <input
                type="text"
                name=""
                id=""
                className="px-2 py-3 border border-gray-500/30 outline-none focus:border-gray-500/50 rounded-lg"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1">
              <label htmlFor="" className="text-lg font-bold">
                Correo electrónico
              </label>
              <input
                type="email"
                name=""
                id=""
                className="px-2 py-3 border border-gray-500/30 outline-none focus:border-gray-500/50 rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="" className="text-lg font-bold">
                Cédula
              </label>
              <input
                type="text"
                name=""
                id=""
                className="px-2 py-3 border border-gray-500/30 outline-none focus:border-gray-500/50 rounded-lg"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1">
              <label htmlFor="" className="text-lg font-bold">
                Fecha de Nacimiento
              </label>
              <input
                type="date"
                name=""
                id=""
                className="px-2 py-3 border border-gray-500/30 outline-none focus:border-gray-500/50 rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="" className="text-lg font-bold">
                Contraseña
              </label>
              <div className="border border-gray-500/30 rounded-lg flex justify-between overflow-hidden focus-within:border-gray-500/50">
                <input
                  type={showPasword ? "text" : "password"}
                  name=""
                  id=""
                  className="px-2 py-3 outline-none w-full"
                />
                <button
                  type="button"
                  onClick={togglePassword}
                  className="w-12 flex items-center justify-center"
                >
                  {showPasword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="" className="text-lg font-bold">
                Sexo
              </label>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <input type="radio" name="sexo" />
                  <label htmlFor="">Hombre</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="radio" name="sexo" />
                  <label htmlFor="">Mujer</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="radio" name="sexo" />
                  <label htmlFor="">Personalizado</label>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-primary py-2 px-3 text-white text-justify text-sm">
            <h5>
              Es posible que las personas que usan nuestro servicio hayan subido
              tu información de contacto a BuenaSalud. Obtén más información. Al
              hacer clic en <strong> Registrarte</strong>, aceptas nuestras
              Condiciones, la Política de privacidad y la Política de cookies.
              Es posible que te enviemos notificaciones por SMS, que puedes
              desactivar cuando quieras.
            </h5>
          </div>

          <button
            type="submit"
            className="text-center py-3 text-lg bg-green-600 text-white uppercase font-bold hover:bg-green-700  transition-colors duration-300"
          >
            Registrar
          </button>
        </form>

        <h5>
          ¿Ya tienes cuenta?.{" "}
          <NavLink to="/login" className="text-blue-600">
            Iniciar sesion
          </NavLink>
        </h5>
      </div>
    </section>
  );
};

export default Registro;
