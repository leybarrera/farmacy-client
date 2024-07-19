import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { usuarioEndpoints } from '../api/usuarios.api';

const useRegister = () => {
  const initialState = {
    nombre: '',
    apellido: '',
    email: '',
    contraseña: '',
    cedula: '',
    fecha_nacimiento: '',
    sexo: '',
  };
  const [user, setUser] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    if (!Object.values(user).some((current) => current == '')) {
      try {
        usuarioEndpoints
          .register(user)
          .then(() => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Usuario registrado',
              showConfirmButton: false,
              timer: 1500,
            });

            setUser(initialState);
            setTimeout(() => {
              navigate('/login');
            }, 1500);
          })
          .catch((error) => {
            Swal.fire({
              title: '¡Error!',
              text: error.response.data.message,
              icon: 'error',
              confirmButtonText: 'Ok',
            });
          });
      } catch (error) {
        Swal.fire({
          title: '¡Error!',
          text: error.response.data.message,
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    } else {
      Swal.fire({
        title: '¡Error!',
        text: 'Todos los campos son obligatorios',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
  };

  return {
    user,
    handleChange,
    handleSubmit,
    togglePassword,
    showPassword,
  };
};
export default useRegister;
