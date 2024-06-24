const Contacto = () => {
  return (
    <section className="py-10 w-3/5 mx-auto flex flex-col gap-5 items-center border border-white rounded-lg mt-4 bg-opacity-80 bg-dark">
      <div className="relative w-52 h-52 rounded-full overflow-hidden">
        <img
          src="contacto.webp"
          alt=""
          className="absolute w-full h-full object-cover"
        />
      </div>
      <div className="w-4/5 mx-auto flex flex-col items-center gap-2 bg-white py-5 px-10 rounded-lg border border-white shadow-lg shadow-gray-300">
        <h3 className="text-2xl font-bold uppercase mb-2">
          Información de Contacto
        </h3>

        <form action="" className="w-full flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-lg font-bold">
              Nombre Completo
            </label>
            <input
              type="text"
              name=""
              id=""
              className="px-2 py-3 border border-gray-500/30 outline-none focus:border-gray-500/50 rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-lg font-bold">
              Correo electrónico
            </label>
            <input
              type="email"
              name=""
              id=""
              className="px-2 py-3 border border-gray-500/30 outline-none focus:border-gray-500/50 rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-lg font-bold">
              Mensaje
            </label>
            <textarea
              name=""
              id=""
              className="resize-none px-2 py-3 border border-gray-500/30 outline-none focus:border-gray-500/50 rounded-lg h-52"
            ></textarea>
          </div>

          <button
            type="submit"
            className="text-center py-3 text-lg bg-green-600 text-white uppercase font-bold hover:bg-green-700  transition-colors duration-300"
          >
            Enviar
          </button>
        </form>
        <div className="w-3/5 mx-auto flex flex-col gap-2 text-center">
          <h4>
            <strong>Dirección: </strong> Av. 19 De Mayo y Calavi, Cotopaxi,
            Ecuador
          </h4>
          <h4>
            <strong>Teléfono: </strong> +593 98 044 6167
          </h4>
          <h4>
            <strong>Email:</strong> nyellove1998@gmail.com
          </h4>
        </div>
      </div>
    </section>
  );
};

export default Contacto;
