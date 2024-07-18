import { useState } from 'react';
import Cart from '../components/Cart/Cart';
import Nav from '../components/Nav/Nav';
import { Outlet } from 'react-router-dom';
import { TiThMenu } from 'react-icons/ti';
const RootLayout = () => {
  const [showCart, setShowCart] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const toggleCart = () => {
    if (showMenu) {
      toggleMenu();
    }
    setShowCart(!showCart);
  };
  const toggleMenu = () => {
    if (showCart) {
      toggleCart();
    }
    setShowMenu(!showMenu);
  };

  return (
    <main className="h-full">
      <Nav
        toggleCart={toggleCart}
        toggleMenu={toggleMenu}
        showMenu={showMenu}
      />
      <button
        className="fixed lg:hidden top-5 left-5 text-gray-300 bg-gray-800 px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-300 z-40"
        onClick={toggleMenu}
      >
        <TiThMenu size={20} />
      </button>
      <section className="pt-20 h-full w-full">
        <Outlet />
      </section>
      <Cart showCart={showCart} toggleCart={toggleCart} />
      {/* Añadir Footer */}
    </main>
  );
};

export default RootLayout;
