import { NavLink, Outlet, useNavigate } from "react-router-dom";
import storageUtils from "../../utils/storage.utils";

const Dashboard = () => {
  const navigate = useNavigate();

  const closeSession = () => {
    storageUtils.deleteData("usuario");
    navigate("/");
  };
  return (
    <main className="flex flex-col w-full">
      <nav className="w-full h-20 flex items-center justify-between px-10 bg-[#333333]">
        <ul className="flex items-center text-lg text-gray-300">
          <NavLink
            to={"/dashboard"}
            className="flex items-center gap-2 hover:bg-primary px-5 py-2 transition-colors duration-500 hover:text-white rounded-md"
          >
            Dashboard
          </NavLink>
          <NavLink
            to={"/dashboard/productos"}
            className="hover:bg-primary px-5 py-2 transition-colors duration-500 hover:text-white rounded-md"
          >
            Productos
          </NavLink>
          <NavLink
            to={"/dashboard/usuarios"}
            className="hover:bg-primary px-5 py-2 transition-colors duration-500 hover:text-white rounded-md"
          >
            Usuarios
          </NavLink>
          <NavLink
            to={"/dashboard/categorias"}
            className="hover:bg-primary px-5 py-2 transition-colors duration-500 hover:text-white rounded-md"
          >
            Categorias
          </NavLink>
          <NavLink
            to={"/dashboard/ventas"}
            className="hover:bg-primary px-5 py-2 transition-colors duration-500 hover:text-white rounded-md"
          >
            Ventas
          </NavLink>
        </ul>

        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full relative overflow-hidden">
            <img
              src="/barrera.webp"
              alt=""
              className="absolute w-full h-full object-cover"
            />
          </div>
          <button className="text-white" onClick={closeSession}>
            Cerrar sesión
          </button>
        </div>
      </nav>
      <Outlet />
    </main>
  );
};

export default Dashboard;
