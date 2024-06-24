import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { usuarioEndpoints } from "../../api/usuarios.api";

const Registro = () => {
  const initialState = {
    nombre: "",
    apellido: "",
    email: "",
    contraseña: "",
    cedula: "",
    fecha_nacimiento: "",
    sexo: "",
  };
  const [user, setUser] = useState(initialState);
  const [showPasword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(!showPasword);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    if (!Object.values(user).some((current) => current == "")) {
      try {
        usuarioEndpoints
          .register(user)
          .then(() => {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Usuario registrado",
              showConfirmButton: false,
              timer: 1500,
            });

            setUser(initialState);
            setTimeout(() => {
              navigate("/login");
            }, 1500);
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
          <div className="grid grid-cols-2 gap-2">
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
          <div className="grid grid-cols-2 gap-2">
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
                  type={showPasword ? "text" : "password"}
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
                    value="fenale"
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
