import { FormProduct } from '../../../components/Forms/index.forms';
import useProduct from '../../../hooks/useProduct';
import TableProduct from '../../../components/Tables/TableProduct';
const Productos = () => {
  const { showRegister } = useProduct();

  return (
    <main className="w-full py-5">
      <h2 className="uppercase text-3xl font-bold text-center">
        Gestión de Productos
      </h2>

      <div className="flex flex-col gap-3 mt-5">
        {showRegister ? <FormProduct /> : <TableProduct />}
      </div>
    </main>
  );
};

export default Productos;
