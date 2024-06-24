import { NavLink } from "react-router-dom";
import { services } from "../../mocks/data";

const Servicios = () => {
  return (
    <section className="w-4/5 mx-auto py-10 flex flex-col gap-5">
      <h3 className="text-4xl text-center text-neutral-800 font-bold tracking-wide">
        Bienvenidos a <strong>¡ BUENA SALUD !</strong>
      </h3>

      {/* Categorías */}
      <div className="grid grid-cols-4 gap-3">
        {services.map((services) => (
          <article
            className="relative border border-gray-500/20 rounded-lg overflow-hidden bg-white cursor-pointer hover:-translate-y-2 transition-all duration-300 pb-10"
            key={services.id}
          >
            <header className="h-52 relative">
              <img
                src={services.posters[0]}
                alt=""
                className="absolute w-full h-full object-cover top-0 left-0 block"
              />
            </header>
            <div className="px-3">
              <h5 className="text-center text-lg text-wrap py-3 font-bold">
                {services.title}
              </h5>
              <h3>{services.shortDescription}</h3>
            </div>

            <NavLink
              to="/"
              className="px-3 py-2 text-white bg-blue-800 absolute bottom-0 w-full text-center"
            >
              Ver más
            </NavLink>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Servicios;
