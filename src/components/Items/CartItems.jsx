import PropTypes from 'prop-types';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { IoIosClose } from 'react-icons/io';
import { TbShoppingCartMinus, TbShoppingCartPlus } from 'react-icons/tb';
import { useDispatch } from 'react-redux';
import {
  addToCart,
  reduceItems,
  removeItem,
} from '../../redux/slices/cartSlice';
const CartItems = ({ cart }) => {
  const dispatch = useDispatch();

  const addItem = (product) => {
    dispatch(addToCart(product));
  };
  const minusItem = (product) => {
    dispatch(reduceItems(product));
  };
  const clearItem = (product) => {
    dispatch(removeItem(product));
  };

  return (
    <div
      key={cart.id}
      className="flex flex-col py-5 border-b border-gray-500/20"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white text-lg">{cart.nombre}</h3>
        <button className=" text-white " onClick={() => clearItem(cart)}>
          <IoIosClose size={30} />
        </button>
      </div>
      <div className="flex gap-2">
        <div className="relative w-32 h-40 rounded-lg overflow-hidden">
          <img
            src={cart.imagen}
            alt=""
            className="absolute w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col gap-3 text-white">
          <h5>
            <strong>Precio: </strong>${cart.precio}
          </h5>
          <h5>
            <strong>SubTotal: </strong>$
            {(cart.cantidad * cart.precio).toFixed(2)}
          </h5>
          <div className="flex items-center gap-2">
            <button className="px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-800">
              <TbShoppingCartMinus onClick={() => minusItem(cart)} />
            </button>
            <span>{cart.cantidad}</span>
            <button
              className="px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-800"
              onClick={() => addItem(cart)}
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
  cart: PropTypes.any.isRequired,
};
export default CartItems;
