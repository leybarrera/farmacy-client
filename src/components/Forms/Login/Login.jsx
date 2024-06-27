import useLogin from "../../../hooks/useLogin";

const FormLogin = () => {
  const { handleSubmit, handleChange, credentials } = useLogin();
  return (
    <form
      action=""
      className="w-full flex flex-col gap-3"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="" className="text-lg font-bold">
          Correo electrónico
        </label>
        <input
          type="text"
          name="email"
          id="email"
          value={credentials.email}
          onChange={handleChange}
          className="px-2 py-3 border border-gray-500/30 outline-none focus:border-gray-500/50 rounded-lg"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="" className="text-lg font-bold">
          Contraseña
        </label>
        <input
          type="password"
          name="contraseña"
          id="contraseña"
          value={credentials.contraseña}
          onChange={handleChange}
          className="px-2 py-3 border border-gray-500/30 outline-none focus:border-gray-500/50 rounded-lg"
        />
      </div>

      <button
        type="submit"
        className="text-center py-3 text-lg bg-green-600 text-white uppercase font-bold hover:bg-green-700  transition-colors duration-300"
      >
        Iniciar sesión
      </button>
    </form>
  );
};

export default FormLogin;
