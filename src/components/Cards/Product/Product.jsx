import { TbShoppingCartPlus } from "react-icons/tb";
import PropTypes from "prop-types";

const Product = ({ product, addItemToCart }) => {
  return (
    <article
      className="relative border border-gray-500/20 rounded-lg overflow-hidden bg-white cursor-pointer hover:-translate-y-2 transition-all duration-300 pb-10"
      key={product.id}
    >
      <header className="h-80 relative">
        <img
          src={product.poster}
          alt=""
          className="absolute w-full h-full object-cover top-0 left-0 block"
        />
      </header>
      <div className="px-5 flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <h3 className="text-center text-lg text-wrap py-3 font-bold">
            {product.name}
          </h3>

          <span className="text-lg text-green-800 font-bold">
            ${product.price.toFixed(2)}
          </span>
        </div>
        <h5>{product.description}</h5>

        <button
          className="flex items-center py-3 justify-center bg-blue-800 text-white gap-2 rounded-lg"
          onClick={() => addItemToCart(product)}
        >
          <TbShoppingCartPlus size={20} />
          Añadir al carrito
        </button>
      </div>
    </article>
  );
};
Product.propTypes = {
  product: PropTypes.any.isRequired,
  addItemToCart: PropTypes.func.isRequired,
};

export default Product;
