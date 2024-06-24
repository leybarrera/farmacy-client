import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { usuarioEndpoints } from "../../api/usuarios.api";
import storageUtils from "../../utils/storage.utils.js";
import { useDispatch } from "react-redux";
import { getCart } from "../../redux/slices/cartSlice.jsx";

const Login = () => {
  const initialState = {
    email: "",
    contraseña: "",
  };
  const [credentials, setCredentials] = useState(initialState);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  useEffect(() => {
    dispatch(getCart());
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!Object.values(credentials).some((current) => current == "")) {
      try {
        usuarioEndpoints
          .login(credentials)
          .then((res) => {
            const user = res.data.usuario;
            storageUtils.saveData("usuario", user);

            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Inicio de sesión exitoso",
              showConfirmButton: false,
              timer: 1500,
            });

            setTimeout(() => {
              if (user.rol === "admin") {
                navigate("/dashboard");
              } else {
                window.location.href = "/";
              }
            }, 1500);

            setCredentials(initialState);
          })
          .catch((err) => {
            Swal.fire({
              title: "¡Error!",
              text: err.response.data.message,
              icon: "error",
              confirmButtonText: "Ok",
            });
          });
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
      <div className="relative w-52 h-52">
        <img
          src="login.webp"
          alt=""
          className="absolute w-full h-full object-cover"
        />
      </div>
      <div className="w-4/5 mx-auto flex flex-col items-center gap-2 bg-white py-5 px-10 rounded-lg border border-white shadow-lg shadow-gray-300">
        <h3 className="text-4xl font-bold uppercase">Buena Salud</h3>
        <h5>
          En BUENASALUD, cuidamos de ti en cada clic: Accede a tus medicamentos
          y consejos de salud desde la comodidad de tu hogar, para que puedas
          enfocarte en alcanzar tus metas con tranquilidad
        </h5>

        <form
          action=""
          className="w-full flex flex-col gap-3"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-lg font-bold">
              Correo electrónico
            </label>
            <input
              type="text"
              name="email"
              id="email"
              value={credentials.email}
              onChange={handleChange}
              className="px-2 py-3 border border-gray-500/30 outline-none focus:border-gray-500/50 rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-lg font-bold">
              Contraseña
            </label>
            <input
              type="password"
              name="contraseña"
              id="contraseña"
              value={credentials.contraseña}
              onChange={handleChange}
              className="px-2 py-3 border border-gray-500/30 outline-none focus:border-gray-500/50 rounded-lg"
            />
          </div>

          <button
            type="submit"
            className="text-center py-3 text-lg bg-green-600 text-white uppercase font-bold hover:bg-green-700  transition-colors duration-300"
          >
            Iniciar sesión
          </button>
        </form>

        <div className="flex flex-col w-full gap-3">
          <NavLink to="#" className="text-blue-700">
            ¿Olvidate tu contraseña?
          </NavLink>
          <NavLink
            to="/registro"
            className="text-center py-3 bg-blue-600 text-white  uppercase font-bold hover:bg-blue-700 transition-all duration-300"
          >
            Crear cuenta nueva
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default Login;
