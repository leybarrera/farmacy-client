import { IoHome } from "react-icons/io5";
import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="fixed top-0 left-0 w-full h-20 bg-[#333333] z-50">
      <section className="w-4/5 mx-auto  h-full flex justify-between items-center">
        <ul className="flex items-center text-lg text-gray-300">
          <NavLink
            to={"/"}
            className="flex items-center gap-2 hover:bg-primary px-5 py-2 transition-colors duration-500 hover:text-white rounded-md"
          >
            <IoHome />
            Inicio
          </NavLink>
          <NavLink
            to={"/servicios"}
            className="hover:bg-primary px-5 py-2 transition-colors duration-500 hover:text-white rounded-md"
          >
            Servicios
          </NavLink>
          <NavLink
            to={"/contacto"}
            className="hover:bg-primary px-5 py-2 transition-colors duration-500 hover:text-white rounded-md"
          >
            Contacto
          </NavLink>
          <NavLink
            to={"/nosotros"}
            className="hover:bg-primary px-5 py-2 transition-colors duration-500 hover:text-white rounded-md"
          >
            Nosotros
          </NavLink>
        </ul>
        <div className="flex items-center gap-2">
          <NavLink
            to="/login"
            className="bg-primary text-white px-5 py-2 text-sm border-primary rounded-md "
          >
            Login
          </NavLink>
          <NavLink
            to="/registro"
            className="bg-primary text-white px-5 py-2 text-sm border-primary rounded-md"
          >
            Registro
          </NavLink>
        </div>
      </section>
    </nav>
  );
};

export default Nav;
