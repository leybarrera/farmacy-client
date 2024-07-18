import PropTypes from 'prop-types';
const Category = ({ category, verProductos }) => {
  return (
    <article
      className="relative border border-gray-500/20 rounded-lg overflow-hidden bg-white cursor-pointer hover:-translate-y-2 transition-all duration-300"
      onClick={() => verProductos(category.id)}
    >
      <header className="h-52 relative">
        <img
          src={category.imagen}
          alt=""
          className="absolute w-full h-full object-cover top-0 left-0 block"
        />
      </header>
      <h5 className="text-center text-lg text-wrap py-3 font-bold">
        {category.nombre}
      </h5>
    </article>
  );
};

Category.propTypes = {
  category: PropTypes.any.isRequired,
  verProductos: PropTypes.func.isRequired,
};

export default Category;
