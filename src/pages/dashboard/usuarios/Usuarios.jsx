import { useEffect, useState } from "react";
import {
  FaEdit,
  FaEye,
  FaEyeSlash,
  FaPlus,
  FaTrash,
  FaTrashRestore,
} from "react-icons/fa";
import { usuarioEndpoints } from "../../../api/usuarios.api";
import Swal from "sweetalert2";

const Usuarios = () => {
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
  const [users, setUsers] = useState([]);
  const [showPasword, setShowPassword] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showUsersDeleted, setShowUsersDeleted] = useState(false);

  const togglePassword = () => setShowPassword(!showPasword);
  const toggleRegister = () => setShowRegister(!showRegister);
  const fetchUsers = () => {
    setShowUsersDeleted(false);
    usuarioEndpoints
      .getAllUsuarios()
      .then((res) => {
        setUsers(res.data.usuarios);
      })
      .catch(console.log);
  };
  const fetchDeletedUsers = () => {
    usuarioEndpoints
      .getDeletedUsuarios()
      .then((res) => {
        setUsers(res.data.usuarios);
        setShowUsersDeleted(true);
      })
      .catch(console.log);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
            fetchUsers();
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

  const deleteUser = (id) => {
    Swal.fire({
      title: "¿Estas seguro de eliminar a este usuario?",
      showDenyButton: true,
      confirmButtonText: "Sí, Eliminar",
      denyButtonText: `No eliminar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        usuarioEndpoints
          .borrar(id)
          .then(() => {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Usuario eliminado con éxito",
              showConfirmButton: false,
              timer: 1500,
            });

            fetchUsers();
          })
          .catch(console.log);
      }
    });
  };
  const recoveryUser = (id) => {
    usuarioEndpoints
      .recuperar(id)
      .then(() => {
        fetchUsers();
      })
      .catch(console.log);
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <main className="w-4/5 mx-auto py-5">
      <h2 className="uppercase text-3xl font-bold text-center">
        Gestión de Usuarios
      </h2>

      <div className="flex flex-col gap-3 mt-5">
        {showRegister ? (
          <div className="w-3/5 mx-auto">
            <form
              action=""
              className="w-full flex flex-col gap-3"
              method="post"
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
                    value={user.apellido}
                    onChange={handleChange}
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
                    value={user.email}
                    onChange={handleChange}
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
                    value={user.cedula}
                    onChange={handleChange}
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
                  <div className="border border-gray-500/30 rounded-lg flex justify-between overflow-hidden focus-within:border-gray-500/50 bg-white">
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
            <div className="flex justify-between">
              <button
                className="flex items-center gap-2 px-5 py-2 bg-orange-900 text-white mb-3 rounded-lg"
                onClick={showUsersDeleted ? fetchUsers : fetchDeletedUsers}
              >
                {showUsersDeleted ? <FaEyeSlash /> : <FaEye />}
                {showUsersDeleted ? "Ocultar" : "Ver"} usuarios eliminados
              </button>
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
                      Email
                    </th>
                    <th scope="col" className="px-6 py-5">
                      Cédula
                    </th>
                    <th scope="col" className="px-6 py-5">
                      Sexo
                    </th>
                    <th scope="col" className="px-6 py-5">
                      Fecha de Nacimiento
                    </th>
                    <th scope="col" className="px-6 py-5">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((currentUser) => (
                    <tr
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      key={currentUser.id}
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {currentUser.nombre} {currentUser.apellido}
                      </th>
                      <td className="px-6 py-4">{currentUser.email}</td>
                      <td className="px-6 py-4">{currentUser.cedula}</td>
                      <td className="px-6 py-4">{currentUser.sexo}</td>
                      <td className="px-6 py-4">
                        {currentUser.fecha_nacimiento}
                      </td>
                      <td className="px-6 py-4 flex items-center gap-2">
                        <button
                          className={`px-3 py-2 border bg-yellow-600 text-white border-yellow-600 rounded-lg ${
                            showUsersDeleted ? "hidden" : "block"
                          }`}
                        >
                          <FaEdit />
                        </button>

                        <button
                          className="px-3 py-2 border bg-red-600 text-white border-red-600 rounded-lg"
                          onClick={() =>
                            showUsersDeleted
                              ? recoveryUser(currentUser.id)
                              : deleteUser(currentUser.id)
                          }
                        >
                          {showUsersDeleted ? <FaTrashRestore /> : <FaTrash />}
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

export default Usuarios;
