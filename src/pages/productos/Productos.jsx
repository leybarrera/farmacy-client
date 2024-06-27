import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { categories } from "../../mocks/data";
import { addToCart } from "../../redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import { Product } from "../../components/Cards/index.cards";
import { FaArrowLeft } from "react-icons/fa";
import { RiEmotionSadLine } from "react-icons/ri";

const ListarProductos = () => {
  const [products, setProducts] = useState([]);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addItemToCart = (product) => {
    dispatch(addToCart(product));
  };

  const back = () => {
    navigate("/");
  };

  useState(() => {
    const category = categories.find((category) => category.id === id);
    const productsDB = category ? category.products : [];
    setProducts(productsDB);
  }, [id]);

  return (
    <div className="w-4/5 mx-auto py-10 flex flex-col gap-5">
      <button
        className="w-fit flex items-center gap-2 bg-blue-800 px-2 py-3 text-sm text-white rounded-lg"
        onClick={back}
      >
        <FaArrowLeft />
        Regresar
      </button>
      {products && products.length > 0 ? (
        <div className="grid grid-cols-2 gap-3">
          {products.map((product) => (
            <Product
              product={product}
              addItemToCart={addItemToCart}
              key={product.id}
            />
          ))}
        </div>
      ) : (
        <div className="flex h-96 flex-col justify-center items-center">
          <RiEmotionSadLine size={90} />
          <p className="text-2xl font-bold">
            No hay productos relacionados con esta categoría.
          </p>
        </div>
      )}
    </div>
  );
};

export default ListarProductos;
