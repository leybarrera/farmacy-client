import { MdPhotoCamera } from 'react-icons/md';

const FormProduct = ({
  toggleRegister,
  handleSubmit,
  handleChange,
  fileInputState,
  handleChangeInputFile,
  producto,
  categorias,
}) => {
  return (
    <div className="w-full mx-auto flex lg:flex-row flex-col gap-2 h-auto">
      <form className="w-full flex flex-col gap-3" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-2 ">
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-lg font-bold">
              Nombre
            </label>
            <input
              type="text"
              name="nombre"
              id="nombre"
              onChange={handleChange}
              value={producto.nombre}
              className="px-2 py-3 border border-gray-500/30 outline-none focus:border-gray-500/50 rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-lg font-bold">
              Precio
            </label>
            <input
              type="number"
              name="precio"
              id="precio"
              onChange={handleChange}
              value={producto.precio}
              className="px-2 py-3 border border-gray-500/30 outline-none focus:border-gray-500/50 rounded-lg"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="" className="text-lg font-bold">
            Categoría
          </label>
          <select
            name="CategoryId"
            id="CategoryId"
            onChange={handleChange}
            className="px-2 py-3 border border-gray-500/30 outline-none focus:border-gray-500/50 rounded-lg"
          >
            <option selected disabled>
              Seleccione la categoria
            </option>
            {categorias.map((currentCategoria) => (
              <option value={currentCategoria.id} key={currentCategoria.id}>
                {currentCategoria.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="" className="text-lg font-bold">
            Descripción
          </label>
          <textarea
            name="descripcion"
            id="descripcion"
            onChange={handleChange}
            value={producto.descripcion}
            className="px-2 py-3 border h-32 border-gray-500/30 outline-none focus:border-gray-500/50 rounded-lg"
          ></textarea>
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
      <div className="w-full flex flex-col gap-2 justify-center items-center">
        <div className="w-full lg:h-[500px] h-[300px] relative flex items-center justify-center border-2 border-dotted border-gray-500/40 bg-white/80 text-gray-400">
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
  );
};
export default FormProduct;
