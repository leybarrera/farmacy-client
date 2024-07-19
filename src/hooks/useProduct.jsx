import { useState } from 'react';
import Swal from 'sweetalert2';
import { productoEndpoints } from '../api/productos.api';
import { categoriaEndpoints } from '../api/categorias.api';
import { useEffect } from 'react';

const useProduct = () => {
  const initialState = {
    nombre: '',
    precio: '',
    imagen: '',
    descripcion: '',
    CategoryId: '',
  };
  const [producto, setProducto] = useState(initialState);
  const [showRegister, setShowRegister] = useState(false);
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const toggleRegister = () => setShowRegister(!showRegister);
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
    return foundCategoria.nombre;
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
    fetchCategorias();
    fetchProductos();
  }, []);

  return {
    producto,
    handleChange,
    handleChangeInputFile,
    handleSubmit,
    showRegister,
    fileInputState,
    getNombreCategoria,
    deleteProduct,
    productos,
    toggleRegister,
    categorias,
  };
};
export default useProduct;
