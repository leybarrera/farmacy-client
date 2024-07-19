import { NavLink } from 'react-router-dom';
import { FormRegister } from '../../components/Forms/index.forms';

const Registro = () => {
  return (
    <section className="py-10 lg:w-3/5 w-[90%] mx-auto flex flex-col gap-5 items-center lg:border lg:border-white rounded-lg mt-4 bg-opacity-80 bg-dark">
      <div className="relative lg:w-52 lg:h-52 w-32 h-32 rounded-full overflow-hidden">
        <img
          src="registro.webp"
          alt=""
          className="absolute w-full h-full object-cover"
        />
      </div>
      <div className="lg:w-4/5 w-full mx-auto flex flex-col items-center gap-2 bg-white py-5 lg:px-10 px-5 rounded-lg border border-white shadow-lg shadow-gray-300">
        <h3 className="text-2xl font-bold uppercase">Crea una cuenta</h3>
        <h5 className="text-lg mb-10">Es rápido y fácil</h5>

        <FormRegister />

        <h5>
          ¿Ya tienes cuenta?.{' '}
          <NavLink to="/login" className="text-blue-600">
            Iniciar sesion
          </NavLink>
        </h5>
      </div>
    </section>
  );
};

export default Registro;
