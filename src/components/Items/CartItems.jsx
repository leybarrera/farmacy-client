import PropTypes from 'prop-types';
import { IoIosClose } from 'react-icons/io';
import { TbShoppingCartMinus, TbShoppingCartPlus } from 'react-icons/tb';
import { useDispatch } from 'react-redux';
import {
  addToCart,
  reduceItem,
  removeItem,
} from '../../redux/slices/cartSlice';
const CartItems = ({ product }) => {
  const dispatch = useDispatch();

  const addItem = (product) => {
    dispatch(addToCart(product));
  };
  const minusItem = (product) => {
    dispatch(reduceItem(product));
  };
  const clearItem = (product) => {
    dispatch(removeItem(product));
  };

  return (
    <div
      key={product.id}
      className="flex flex-col py-5 border-b border-gray-500/20"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white text-lg">{product.nombre}</h3>
        <button className=" text-white " onClick={() => clearItem(product)}>
          <IoIosClose size={30} />
        </button>
      </div>
      <div className="flex gap-2">
        <div className="relative w-32 h-40 rounded-lg overflow-hidden">
          <img
            src={product.imagen}
            alt=""
            className="absolute w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col gap-3 text-white">
          <h5>
            <strong>Precio: </strong>${product.precio}
          </h5>
          <h5>
            <strong>SubTotal: </strong>$
            {(product.cantidad * product.precio).toFixed(2)}
          </h5>
          <div className="flex items-center gap-2">
            <button className="px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-800">
              <TbShoppingCartMinus onClick={() => minusItem(product)} />
            </button>
            <span>{product.cantidad}</span>
            <button
              className="px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-800"
              onClick={() => addItem(product)}
            >
              <TbShoppingCartPlus />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

CartItems.propTypes = {
  product: PropTypes.any.isRequired,
};
export default CartItems;
