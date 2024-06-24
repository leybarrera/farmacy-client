import { IoHome } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import storageUtils from "../../utils/storage.utils";
import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";

const Nav = ({ toggleCart }) => {
  const [userLogged, setUserLogged] = useState(false);
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shoppingCart } = cart;

  console.log(shoppingCart);
  const isLogged = () => {
    const usuario = storageUtils.getData("usuario");
    setUserLogged(usuario !== null);
  };

  const closeSession = () => {
    storageUtils.deleteData("usuario");
    setUserLogged(false);
    navigate("/");
  };

  useEffect(() => {
    isLogged();
  }, []);

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

        <div className="flex items-center gap-5">
          {userLogged ? (
            <>
              <button className="text-gray-300 relative" onClick={toggleCart}>
                <FaShoppingCart size={20} />

                <span className="absolute text-xs -top-1/3 -right-1/3 z-50 bg-red-500 w-4 h-4 rounded-full">
                  {shoppingCart.length}
                </span>
              </button>
              <button
                className="bg-primary text-white px-5 py-2 text-sm border-primary rounded-md "
                onClick={closeSession}
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </section>
    </nav>
  );
};

export default Nav;
