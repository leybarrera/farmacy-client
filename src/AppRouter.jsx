import { Routes, Route } from "react-router-dom";
import Inicio from "./pages/inicio/Inicio";
import Servicios from "./pages/servicios/Servicios";
import Nosotros from "./pages/nosotros/Nosotros";
import Contacto from "./pages/contacto/Contacto";
import Login from "./pages/login/Login";
import Registro from "./pages/registro/Registro";
import Error from "./pages/error/Error";
import RootLayout from "./layouts/RootLayout";
import Dashboard from "./pages/dashboard";
import Usuarios from "./pages/dashboard/usuarios/Usuarios";
import Categorias from "./pages/dashboard/categorias/Categorias";
import Ventas from "./pages/dashboard/ventas/Ventas";
import Productos from "./pages/dashboard/productos/Productos";
import Landing from "./pages/dashboard/landing/Landing";
import ListarProductos from "./pages/productos/Productos";
const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Inicio />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/productos/categoria/:id" element={<ListarProductos />} />
      </Route>

      <Route path="/dashboard" element={<Dashboard />}>
        <Route index element={<Landing />} />
        <Route path="/dashboard/usuarios" element={<Usuarios />} />
        <Route path="/dashboard/categorias" element={<Categorias />} />
        <Route path="/dashboard/ventas" element={<Ventas />} />
        <Route path="/dashboard/productos" element={<Productos />} />
      </Route>
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default AppRouter;
