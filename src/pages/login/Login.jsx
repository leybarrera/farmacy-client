import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getCart } from '../../redux/slices/cartSlice.jsx';
import { FormLogin } from '../../components/Forms/index.forms.js';
import Modal from '../../components/Modal/Modal.jsx';
import { useState } from 'react';

const Login = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(!showModal);

  useEffect(() => {
    dispatch(getCart());
  }, []);

  return showModal ? (
    <Modal toggleModal={toggleModal} />
  ) : (
    <section className="py-10 lg:w-3/5 mx-auto flex flex-col gap-5 items-center lg:border lg:border-white rounded-lg mt-4 bg-opacity-80 bg-dark">
      <div className="relative lg:w-52 lg:h-52 h-32 w-32">
        <img
          src="login.webp"
          alt=""
          className="absolute w-full h-full object-cover"
        />
      </div>
      <div className="lg:w-4/5 w-[90%] mx-auto flex flex-col items-center gap-2 bg-white py-5 lg:px-10 px-2 rounded-lg border border-white shadow-lg shadow-gray-300">
        <h3 className="text-4xl font-bold uppercase">Buena Salud</h3>
        <h5>
          En BUENASALUD, cuidamos de ti en cada clic: Accede a tus medicamentos
          y consejos de salud desde la comodidad de tu hogar, para que puedas
          enfocarte en alcanzar tus metas con tranquilidad
        </h5>

        {/* Login Form */}
        <FormLogin />

        <div className="flex flex-col w-full gap-3">
          <button type="button" className="text-blue-700" onClick={toggleModal}>
            ¿Olvidate tu contraseña?
          </button>
          <NavLink
            to="/registro"
            className="text-center py-3 bg-blue-600 text-white  uppercase font-bold hover:bg-blue-700 transition-all duration-300"
          >
            Crear cuenta nueva
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default Login;
