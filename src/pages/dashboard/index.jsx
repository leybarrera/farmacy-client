import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import storageUtils from '../../utils/storage.utils';
import { MdDashboard } from 'react-icons/md';
import { FaArrowLeft, FaList } from 'react-icons/fa';
import { FaUserGroup } from 'react-icons/fa6';
import { BiSolidCategory } from 'react-icons/bi';
import { RiMoneyDollarBoxFill } from 'react-icons/ri';
import { useState } from 'react';
import { TiThMenu } from 'react-icons/ti';

const Dashboard = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => setShowMenu(!showMenu);
  const closeSession = () => {
    storageUtils.deleteData('usuario');
    navigate('/');
  };
  return (
    <main className="flex flex-col w-full">
      <button
        className="fixed lg:hidden top-5 left-5 text-gray-300 bg-gray-800 px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-300"
        onClick={toggleMenu}
      >
        <TiThMenu size={20} />
      </button>
      <nav
        className={`fixed top-0 lg:left-0 lg:w-full lg:h-20 w-[70vw] h-full flex items-center lg:flex-row flex-col lg:px-10 bg-[#333333] z-50 justify-between ${
          showMenu ? 'left-0' : '-left-full'
        } transition-all duration-300`}
      >
        <div className="flex items-center justify-between py-5 border-b border-gray-500/20 w-full px-10 lg:hidden">
          <h1 className="text-white uppercase font-bold">Buena Salud</h1>
          <button
            className="bg-white/20 px-3 py-2 text-gray-300 rounded-lg"
            onClick={toggleMenu}
          >
            <FaArrowLeft />
          </button>
        </div>
        <ul className="flex items-center lg:flex-row flex-col text-lg text-gray-300 w-full lg:w-auto h-full">
          <NavLink
            to={'/dashboard'}
            className="flex items-center gap-2 hover:bg-primary lg:px-5 lg:py-2 px-10 py-5 transition-colors duration-500 hover:text-white rounded-md border-b border-gray-500/20 w-full lg:border-0"
          >
            <MdDashboard />
            Dashboard
          </NavLink>
          <NavLink
            to={'/dashboard/productos'}
            className="flex items-center gap-2 hover:bg-primary lg:px-5 lg:py-2 px-10 py-5 transition-colors duration-500 hover:text-white rounded-md border-b border-gray-500/20 w-full lg:border-0"
          >
            <FaList />
            Productos
          </NavLink>
          <NavLink
            to={'/dashboard/usuarios'}
            className="flex items-center gap-2 hover:bg-primary lg:px-5 lg:py-2 px-10 py-5 transition-colors duration-500 hover:text-white rounded-md border-b border-gray-500/20 w-full lg:border-0"
          >
            <FaUserGroup />
            Usuarios
          </NavLink>
          <NavLink
            to={'/dashboard/categorias'}
            className="flex items-center gap-2 hover:bg-primary lg:px-5 lg:py-2 px-10 py-5 transition-colors duration-500 hover:text-white rounded-md border-b border-gray-500/20 w-full lg:border-0"
          >
            <BiSolidCategory />
            Categorias
          </NavLink>
          <NavLink
            to={'/dashboard/ventas'}
            className="flex items-center gap-2 hover:bg-primary lg:px-5 lg:py-2 px-10 py-5 transition-colors duration-500 hover:text-white rounded-md border-b border-gray-500/20 w-full lg:border-0"
          >
            <RiMoneyDollarBoxFill />
            Ventas
          </NavLink>
        </ul>

        <div className="flex items-center flex-col lg:flex-row gap-3 py-5">
          <div className="w-10 h-10 rounded-full relative overflow-hidden">
            <img
              src="/barrera.webp"
              alt=""
              className="absolute w-full h-full object-cover"
            />
          </div>
          <button
            className="text-white bg-blue-800 px-3 py-2"
            onClick={closeSession}
          >
            Cerrar sesión
          </button>
        </div>
      </nav>
      <div className="mt-20 lg:w-4/5 w-[90%] mx-auto">
        <Outlet />
      </div>
    </main>
  );
};

export default Dashboard;
