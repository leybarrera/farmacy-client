import { useDispatch, useSelector } from 'react-redux';
import storageUtils from '../../utils/storage.utils';
import { ventaEndpoints } from '../../api/ventas.api';
import { BsFillCartXFill } from 'react-icons/bs';
import { TbShoppingCartCancel, TbShoppingCartDollar } from 'react-icons/tb';
import { clearCart, getCart } from '../../redux/slices/cartSlice';
import Swal from 'sweetalert2';
const Cart = ({ showCart, toggleCart }) => {
  const { shoppingCart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const clearShoppingCart = () => {
    dispatch(clearCart());
    toggleCart();
  };
  const confirmarVenta = () => {
    const user = storageUtils.getData('usuario');
    ventaEndpoints
      .confirmarVenta(
        user.email,
        user.nombre + ' ' + user.apellido,
        user.id,
        shoppingCart
      )
      .then(() => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Compra realizada. Revisa tu email',
          showConfirmButton: false,
          timer: 1500,
        });
        clearShoppingCart();
      })
      .catch((err) => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: err.response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return (
    <aside
      className={`fixed top-0 ${
        showCart ? 'right-0' : '-right-full'
      } h-full lg:w-[20vw] w-[70vw] z-50 bg-primary transition-all duration-300 overflow-y-scroll pb-10`}
    >
      <button
        className="absolute top-3 right-3 text-white text-xl"
        onClick={toggleCart}
      >
        X
      </button>
      <div className="mt-20 px-5 flex flex-col gap-3">
        {shoppingCart && shoppingCart.length > 0 ? (
          <>
            {shoppingCart.map((cart) => (
              <div
                key={cart.id}
                className="flex flex-col py-5 border-b border-gray-500/20"
              >
                <h3 className="text-white text-lg mb-4">{cart.nombre}</h3>
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
                      <strong>Cantidad: </strong>
                      {cart.cantidad}
                    </h5>
                    <h5>
                      <strong>SubTotal: </strong>$
                      {(cart.cantidad * cart.precio).toFixed(2)}
                    </h5>
                  </div>
                </div>
              </div>
            ))}

            <button
              className="flex gap-2 justify-center items-center py-2 bg-red-700 text-white"
              onClick={clearShoppingCart}
            >
              <BsFillCartXFill />
              Vaciar carrito
            </button>
            <button
              onClick={confirmarVenta}
              className="flex gap-2 justify-center items-center py-2 bg-blue-700 text-white"
            >
              <TbShoppingCartDollar />
              Confirmar compra
            </button>
          </>
        ) : (
          <div className="flex flex-col gap-3 justify-center items-center text-white">
            <TbShoppingCartCancel size={50} />
            <h3 className="text-lg">Carrito vacío</h3>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Cart;
