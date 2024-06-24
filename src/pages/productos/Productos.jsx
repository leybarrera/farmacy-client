import { useState } from "react";
import { useParams } from "react-router-dom";
import { categories } from "../../mocks/data";
import { TbShoppingCartPlus } from "react-icons/tb";
import { addToCart } from "../../redux/slices/cartSlice";
import { useDispatch } from "react-redux";

const ListarProductos = () => {
  const [productos, setProductos] = useState([]);
  const { id } = useParams();
  const dispatch = useDispatch();

  const addItemToCart = (producto) => {
    dispatch(addToCart(producto));
  };

  useState(() => {
    const category = categories.find((category) => category.id === id);
    const productsDB = category ? category.products : [];
    setProductos(productsDB);
  }, [id]);

  return (
    <div className="w-4/5 mx-auto py-10 flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-3">
        {productos.map((producto) => (
          <article
            className="relative border border-gray-500/20 rounded-lg overflow-hidden bg-white cursor-pointer hover:-translate-y-2 transition-all duration-300 pb-10"
            key={producto.id}
          >
            <header className="h-80 relative">
              <img
                src={producto.poster}
                alt=""
                className="absolute w-full h-full object-cover top-0 left-0 block"
              />
            </header>
            <div className="px-5 flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <h3 className="text-center text-lg text-wrap py-3 font-bold">
                  {producto.name}
                </h3>

                <span className="text-lg text-green-800 font-bold">
                  ${producto.price.toFixed(2)}
                </span>
              </div>
              <h5>{producto.description}</h5>

              <button
                className="flex items-center py-3 justify-center bg-blue-800 text-white gap-2 rounded-lg"
                onClick={() => addItemToCart(producto)}
              >
                <TbShoppingCartPlus size={20} />
                Añadir al carrito
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default ListarProductos;
