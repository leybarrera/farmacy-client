import { useState } from "react";
import { usuarioEndpoints } from "../api/usuarios.api";
import storageUtils from "../utils/storage.utils";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const initialState = {
    email: "",
    contraseña: "",
  };
  const [credentials, setCredentials] = useState(initialState);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!Object.values(credentials).some((current) => current == "")) {
      try {
        usuarioEndpoints
          .login(credentials)
          .then((res) => {
            const user = res.data.usuario;
            storageUtils.saveData("usuario", user);

            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Inicio de sesión exitoso",
              showConfirmButton: false,
              timer: 1500,
            });

            setTimeout(() => {
              if (user.rol === "admin") {
                navigate("/dashboard");
              } else {
                window.location.href = "/";
              }
            }, 1500);

            setCredentials(initialState);
          })
          .catch((err) => {
            Swal.fire({
              title: "¡Error!",
              text: err.response.data.message,
              icon: "error",
              confirmButtonText: "Ok",
            });
          });
      } catch (error) {
        Swal.fire({
          title: "¡Error!",
          text: error.response.data.message,
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    } else {
      Swal.fire({
        title: "¡Error!",
        text: "Todos los campos son obligatorios",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  return {
    credentials,
    handleChange,
    handleSubmit,
  };
};

export default useLogin;
