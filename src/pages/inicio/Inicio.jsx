import { useNavigate } from "react-router-dom";
import { categories } from "../../mocks/data";
import { Category } from "../../components/Cards/index.cards";
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
          <Category
            category={category}
            verProductos={verProductos}
            key={category.id}
          />
        ))}
      </div>
    </section>
  );
};

export default Inicio;
