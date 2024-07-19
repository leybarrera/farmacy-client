import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addToCart } from '../../redux/slices/cartSlice';
import { useDispatch } from 'react-redux';
import { Product } from '../../components/Cards/index.cards';
import { FaArrowLeft } from 'react-icons/fa';
import { RiEmotionSadLine } from 'react-icons/ri';
import { useEffect } from 'react';
import { productoEndpoints } from '../../api/productos.api';

const ListarProductos = () => {
  const [products, setProducts] = useState([]);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addItemToCart = (product) => {
    dispatch(addToCart(product));
  };

  const back = () => {
    navigate('/');
  };

  useEffect(() => {
    productoEndpoints
      .getByCategory(id)
      .then((res) => {
        setProducts(res.data.productos);
      })
      .catch(console.log);
  }, [id]);

  return (
    <div className="lg:w-4/5 w-full mx-auto py-10 lg:px-0 px-5 flex flex-col gap-5">
      <button
        className="w-fit flex items-center gap-2 bg-blue-800 px-2 py-3 text-sm text-white rounded-lg"
        onClick={back}
      >
        <FaArrowLeft />
        Regresar
      </button>
      {products && products.length > 0 ? (
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-3">
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
