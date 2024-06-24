import { developers } from "../../mocks/data";

const Nosotros = () => {
  return (
    <section className="w-4/5 mx-auto py-10 flex flex-col gap-5">
      <div className="relative w-52 h-52 mx-auto mb-5">
        <img
          src="logo.webp"
          alt=""
          className="absolute w-full h-full object-cover"
        />
      </div>
      <div className="w-3/5 mx-auto flex flex-col gap-2">
        <h3 className="text-3xl uppercase font-bold text-center">
          Acerca de Nosotros
        </h3>
        <div className="px-3 py-4 text-white bg-primary border border-gray-500/20 rounded-lg">
          <h5 className="text-lg">
            BUENASALUD es una farmacia comprometida con la salud y el bienestar
            de nuestros clientes, ofreciendo una amplia gama de productos y
            servicios para satisfacer sus necesidades médicas y de estilo de
            vida. Nuestro equipo está dedicado a proporcionar atención
            personalizada y asesoramiento experto, asegurando que cada cliente
            reciba el mejor cuidado y atención para mejorar su calidad de vida.
          </h5>
        </div>
      </div>
      {/* Desarrolladores */}
      <div className="grid grid-cols-4 gap-3">
        {developers.map((developer) => (
          <article
            className="relative py-10 border border-gray-500/20 rounded-lg overflow-hidden bg-white cursor-pointer hover:-translate-y-2 transition-all duration-300"
            key={developer.id}
          >
            <header className="h-52 w-52 relative rounded-full overflow-hidden mx-auto">
              <img
                src={developer.poster}
                alt=""
                className="absolute w-full h-full object-cover top-0 left-0 block hover:scale-110 transition-all duration-300"
              />
            </header>
            <h5 className="text-center text-lg text-wrap py-3 font-bold uppercase">
              {developer.name}
            </h5>
            <h3 className="mx-4 text-justify">{developer.rolDescription}</h3>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Nosotros;
