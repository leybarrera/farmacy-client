import Nav from "../components/Nav/Nav";
import { Outlet } from "react-router-dom";
const RootLayout = () => {
  return (
    <main className="h-full">
      <Nav />
      <section className="pt-20 h-full w-full">
        <Outlet />
      </section>
      {/* Añadir Footer */}
    </main>
  );
};

export default RootLayout;
