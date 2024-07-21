import { FormProduct } from '../../../components/Forms/index.forms';
import TableProduct from '../../../components/Tables/TableProduct';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { useEffect } from 'react';
import { productoEndpoints } from '../../../api/productos.api';
import { categoriaEndpoints } from '../../../api/categorias.api';
const Productos = () => {
  const initialState = {
    nombre: '',
    precio: '',
    imagen: '',
    descripcion: '',
    CategoryId: '',
  };
  const [showRegister, setShowRegister] = useState(false);
  const toggleRegister = () => setShowRegister(!showRegister);
  const [producto, setProducto] = useState(initialState);
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const [fileInputState, setFileInputState] = useState(null);

  const fetchCategorias = () => {
    categoriaEndpoints
      .getAllCategorias()
      .then((res) => {
        setCategorias(res.data.categorias);
      })
      .catch(console.log);
  };
  const fetchProductos = () => {
    productoEndpoints
      .getAllProductos()
      .then((res) => {
        setProductos(res.data.productos);
      })
      .catch(console.log);
  };

  const deleteProduct = (id) => {
    Swal.fire({
      title: '¿Estas seguro de eliminar a este producto?',
      showDenyButton: true,
      confirmButtonText: 'Sí, Eliminar',
      denyButtonText: `No eliminar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        productoEndpoints
          .borrar(id)
          .then(() => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Producto eliminado con éxito',
              showConfirmButton: false,
              timer: 1500,
            });

            fetchProductos();
          })
          .catch((err) => {
            Swal.fire({
              title: '¡Error!',
              text: err.response.data.message,
              icon: 'error',
              confirmButtonText: 'Ok',
            });
          });
      }
    });
  };

  const getNombreCategoria = (id) => {
    const foundCategoria = categorias.find((current) => current.id == id);
    return foundCategoria ? foundCategoria.nombre : 'Categoría no encontrada';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({
      ...producto,
      [name]: value,
    });
  };
  const handleChangeInputFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFileInputState(reader.result);
    };
  };
  const handleSubmit = (e) => {
    console.log(producto);
    e.preventDefault();
    if (fileInputState) {
      producto.imagen = fileInputState;
    }
    if (!Object.values(producto).some((current) => current == '')) {
      try {
        productoEndpoints
          .register(producto)
          .then(() => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Producto registrado',
              showConfirmButton: false,
              timer: 1500,
            });

            setProducto(initialState);
            fetchProductos();
            toggleRegister();
          })
          .catch((err) => {
            Swal.fire({
              title: '¡Error!',
              text: err.response.data.message,
              icon: 'error',
              confirmButtonText: 'Ok',
            });
          });
      } catch (error) {
        Swal.fire({
          title: '¡Error!',
          text: error.response.data.message,
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    } else {
      Swal.fire({
        title: '¡Error!',
        text: 'Todos los campos son obligatorios',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);
  useEffect(() => {
    fetchCategorias();
  }, [productos]);

  return (
    <main className="w-full py-5">
      <h2 className="uppercase text-3xl font-bold text-center">
        Gestión de Productos
      </h2>

      <div className="flex flex-col gap-3 mt-5">
        {showRegister ? (
          <FormProduct
            toggleRegister={toggleRegister}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            fileInputState={fileInputState}
            handleChangeInputFile={handleChangeInputFile}
            producto={producto}
            categorias={categorias}
          />
        ) : (
          <TableProduct
            toggleRegister={toggleRegister}
            productos={productos}
            getNombreCategoria={getNombreCategoria}
            deleteProduct={deleteProduct}
          />
        )}
      </div>
    </main>
  );
};

export default Productos;
