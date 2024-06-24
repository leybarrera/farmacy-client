import { Routes, Route } from "react-router-dom";
import Inicio from "./pages/inicio/Inicio";
import Servicios from "./pages/servicios/Servicios";
import Nosotros from "./pages/nosotros/Nosotros";
import Contacto from "./pages/contacto/Contacto";
import Login from "./pages/login/Login";
import Registro from "./pages/registro/Registro";
import Error from "./pages/error/Error";
import RootLayout from "./layouts/RootLayout";
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
      </Route>
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default AppRouter;
