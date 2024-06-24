import { useNavigate } from "react-router-dom";
import { categories } from "../../mocks/data";

const Inicio = () => {
  const navigate = useNavigate();
  const verProductos = (id) => {
    navigate(`/productos/categoria/${id}`);
  };
  return (
    <section className="w-4/5 mx-auto py-10 flex flex-col gap-5">
      <h3 className="text-4xl text-center text-neutral-800 font-bold tracking-wide">
        Bienvenidos a <strong>¡ BUENA SALUD !</strong>
      </h3>

      {/* Categorías */}
      <div className="grid grid-cols-4 gap-3">
        {categories.map((category) => (
          <article
            className="relative border border-gray-500/20 rounded-lg overflow-hidden bg-white cursor-pointer hover:-translate-y-2 transition-all duration-300"
            key={category.id}
            onClick={() => verProductos(category.id)}
          >
            <header className="h-52 relative">
              <img
                src={category.poster}
                alt=""
                className="absolute w-full h-full object-cover top-0 left-0 block"
              />
            </header>
            <h5 className="text-center text-lg text-wrap py-3 font-bold">
              {category.name}
            </h5>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Inicio;
