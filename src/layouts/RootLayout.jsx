import { useState } from "react";
import Cart from "../components/Cart/Cart";
import Nav from "../components/Nav/Nav";
import { Outlet } from "react-router-dom";
const RootLayout = () => {
  const [showCart, setShowCart] = useState(false);
  const toggleCart = () => setShowCart(!showCart);
  return (
    <main className="h-full">
      <Nav toggleCart={toggleCart} />
      <section className="pt-20 h-full w-full">
        <Outlet />
      </section>
      <Cart showCart={showCart} toggleCart={toggleCart} />
      {/* Añadir Footer */}
    </main>
  );
};

export default RootLayout;
