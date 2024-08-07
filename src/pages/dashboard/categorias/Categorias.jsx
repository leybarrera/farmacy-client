import { useEffect, useState } from 'react';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { categoriaEndpoints } from '../../../api/categorias.api';
import Swal from 'sweetalert2';
import { categories } from '../../../mocks/data';
import { MdPhotoCamera } from 'react-icons/md';
const Categorias = () => {
  const initialState = {
    nombre: '',
    imagen: '',
    descripcion: '',
  };
  const [categoria, setCategoria] = useState(initialState);
  const [categorias, setCategorias] = useState([]);
  const [showRegister, setShowRegister] = useState(false);
  const [fileInputState, setFileInputState] = useState(null);
  const toggleRegister = () => setShowRegister(!showRegister);

  const fetchCategorias = () => {
    categoriaEndpoints
      .getAllCategorias()
      .then((res) => {
        setCategorias(res.data.categorias);
      })
      .catch(console.log);
  };

  const handleChangeInputFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFileInputState(reader.result);
    };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoria({
      ...categoria,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (fileInputState) {
      categoria.imagen = fileInputState;
    }
    if (!Object.values(categoria).some((current) => current == '')) {
      try {
        categoriaEndpoints
          .register(categoria)
          .then(() => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Categoria registrada',
              showConfirmButton: false,
              timer: 1500,
            });

            setCategoria(initialState);
            fetchCategorias();
            toggleRegister();
          })
          .catch(console.log);
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

  const deleteCategoria = (id) => {
    Swal.fire({
      title: '¿Estas seguro de eliminar a este categoría?',
      showDenyButton: true,
      confirmButtonText: 'Sí, Eliminar',
      denyButtonText: `No eliminar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        categoriaEndpoints
          .borrar(id)
          .then(() => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Categoria eliminada con éxito',
              showConfirmButton: false,
              timer: 1500,
            });

            fetchCategorias();
          })
          .catch(console.log);
      }
    });
  };

  useEffect(() => {
    fetchCategorias();
  }, []);
  return (
    <main className="w-full py-5">
      <h2 className="uppercase text-3xl font-bold text-center">
        Gestión de Categorias
      </h2>

      <div className="flex flex-col gap-3 mt-5">
        {showRegister ? (
          <div className="lg:w-3/5 w-full mx-auto grid lg:grid-cols-2 grid-cols-1 gap-2 h-80 ">
            <form
              action=""
              className="w-full flex flex-col gap-3"
              onSubmit={handleSubmit}
            >
              <div className="grid gap-2">
                <div className="flex flex-col gap-1">
                  <label htmlFor="" className="text-lg font-bold">
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    id="nombre"
                    value={categoria.nombre}
                    onChange={handleChange}
                    className="px-2 py-3 border border-gray-500/30 outline-none focus:border-gray-500/50 rounded-lg"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="" className="text-lg font-bold">
                    Descripción
                  </label>
                  <textarea
                    name="descripcion"
                    id="descripcion"
                    value={categoria.descripcion}
                    onChange={handleChange}
                    className="px-2 py-3 border border-gray-500/30 outline-none focus:border-gray-500/50 rounded-lg lg:h-52 h-32 resize-none"
                  ></textarea>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  className="text-center py-3 text-lg bg-primary text-white uppercase font-bold hover:bg-neutral-800  transition-colors duration-300"
                  onClick={toggleRegister}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="text-center py-3 text-lg bg-green-600 text-white uppercase font-bold hover:bg-green-700  transition-colors duration-300"
                >
                  Registrar
                </button>
              </div>
            </form>
            <div className="flex flex-col gap-2 justify-center items-center py-10">
              <div className="w-full lg:h-full h-[300px] relative flex items-center justify-center border-2 border-dotted border-gray-500/40 bg-white/80 text-gray-400">
                {fileInputState ? (
                  <img
                    src={fileInputState}
                    className="w-full h-full absolute object-cover"
                  />
                ) : (
                  <MdPhotoCamera size={80} />
                )}
              </div>
              <input
                type="file"
                name="image"
                id="image"
                onChange={handleChangeInputFile}
              />
            </div>
          </div>
        ) : (
          <div className="w-full ">
            <div className="flex justify-end">
              <button
                className="flex items-center gap-2 px-5 py-2 bg-green-700 text-white mb-3 rounded-lg"
                onClick={toggleRegister}
              >
                <FaPlus />
                Agregar
              </button>
            </div>
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-5">
                      Nombre
                    </th>
                    <th scope="col" className="px-6 py-5">
                      Imagen
                    </th>

                    <th scope="col" className="px-6 py-5">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {categorias.map((currentCategoria) => (
                    <tr
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      key={currentCategoria.id}
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {currentCategoria.nombre}
                      </th>
                      <td className="px-6 py-4">
                        <div className="relative w-20 h-20">
                          <img
                            src={currentCategoria.imagen}
                            alt=""
                            className="absolute w-full h-full object-cover"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 flex items-center gap-2">
                        <button className="px-3 py-2 border bg-yellow-600 text-white border-yellow-600 rounded-lg">
                          <FaEdit />
                        </button>
                        <button
                          className="px-3 py-2 border bg-red-600 text-white border-red-600 rounded-lg"
                          onClick={() => deleteCategoria(currentCategoria.id)}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Categorias;
