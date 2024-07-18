import { useNavigate } from 'react-router-dom';
import { Category } from '../../components/Cards/index.cards';
import { useState } from 'react';
import { useEffect } from 'react';
import { categoriaEndpoints } from '../../api/categorias.api';
const Inicio = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const verProductos = (id) => {
    navigate(`/productos/categoria/${id}`);
  };

  useEffect(() => {
    categoriaEndpoints
      .getAllCategorias()
      .then((res) => {
        setCategories(res.data.categorias);
      })
      .catch(console.log);
  }, []);
  return (
    <section className="w-4/5 mx-auto py-10 flex flex-col gap-5">
      <h3 className="text-4xl text-center text-neutral-800 font-bold tracking-wide">
        Bienvenidos a <strong>¡ BUENA SALUD !</strong>
      </h3>

      {/* Categorías */}
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-3">
        {categories.length > 0 ? (
          categories.map((category) => (
            <Category
              category={category}
              verProductos={verProductos}
              key={category.id}
            />
          ))
        ) : (
          <h1>Hi world</h1>
        )}
      </div>
    </section>
  );
};

export default Inicio;
