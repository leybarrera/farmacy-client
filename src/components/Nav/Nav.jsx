import { IoHome } from 'react-icons/io5';
import { NavLink, useNavigate } from 'react-router-dom';
import storageUtils from '../../utils/storage.utils';
import { useEffect, useState } from 'react';
import { FaArrowLeft, FaBusinessTime, FaShoppingCart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { FaCartShopping, FaIdCard, FaUserGroup } from 'react-icons/fa6';

const Nav = ({ toggleCart, toggleMenu, showMenu }) => {
  const [userLogged, setUserLogged] = useState(false);
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shoppingCart } = cart;

  const isLogged = () => {
    const usuario = storageUtils.getData('usuario');
    setUserLogged(usuario !== null);
  };

  const closeSession = () => {
    storageUtils.deleteData('usuario');
    setUserLogged(false);
    navigate('/');
  };

  useEffect(() => {
    isLogged();
  }, []);

  return (
    <nav
      className={`fixed w-[70vw] lg:w-full lg:left-0 h-full lg:h-20 top-0 ${
        showMenu ? 'left-0' : '-left-full'
      } bg-[#333333]  lg:border-r lg:border-gray-50/20 transition-all duration-300 z-50`}
    >
      <div className="lg:w-4/5 lg:mx-auto w-full flex flex-col lg:flex-row lg:justify-between lg:items-center h-full">
        <section className="lg:hidden px-5 py-10 flex items-center justify-between border-b border-gray-50/20 ">
          <h1 className="text-white uppercase font-bold">Buena Salud</h1>
          <button
            className="bg-white/20 px-3 py-2 text-gray-300 rounded-lg"
            onClick={toggleMenu}
          >
            <FaArrowLeft />
          </button>
        </section>

        <section className="h-full">
          <ul className="flex flex-col lg:flex-row lg:items-center h-full">
            <NavLink
              to={'/'}
              className="flex items-center gap-2 hover:bg-primary p-5 transition-colors duration-500 hover:text-white rounded-md
            border-b border-gray-500/20 text-gray-300 
            lg:border-0 lg:p-0 lg:px-5 lg:h-full"
            >
              <IoHome />
              Inicio
            </NavLink>
            <NavLink
              to={'/servicios'}
              className="flex items-center gap-2 hover:bg-primary p-5 transition-colors duration-500 hover:text-white rounded-md
            border-b border-gray-500/20 text-gray-300 lg:border-0 lg:p-0 lg:px-5 lg:h-full
            "
            >
              <FaBusinessTime />
              Servicios
            </NavLink>
            <NavLink
              to={'/contacto'}
              className="flex items-center gap-2 hover:bg-primary p-5 transition-colors duration-500 hover:text-white rounded-md
            border-b border-gray-500/20 text-gray-300 lg:border-0 lg:p-0 lg:px-5 lg:h-full
            "
            >
              <FaIdCard />
              Contacto
            </NavLink>
            <NavLink
              to={'/nosotros'}
              className="flex items-center gap-2 hover:bg-primary p-5 transition-colors duration-500 hover:text-white rounded-md
            border-b border-gray-500/20 text-gray-300 lg:border-0 lg:p-0 lg:px-5 lg:h-full
            "
            >
              <FaUserGroup />
              Nosotros
            </NavLink>
            <NavLink
              to={'/pagos'}
              className="flex items-center gap-2 hover:bg-primary p-5 transition-colors duration-500 hover:text-white rounded-md
            border-b border-gray-500/20 text-gray-300 lg:border-0 lg:p-0 lg:px-5 lg:h-full
            "
            >
              <FaCartShopping />
              Mis compras
            </NavLink>
          </ul>
        </section>

        <section className="px-5 py-10 flex items-center justify-between lg:gap-10">
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
        </section>
      </div>
    </nav>
  );
};

export default Nav;
