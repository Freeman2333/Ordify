import { formatCurrency } from "../../utils/utils";

const ProductList = ({ products }) => (
  <>
    <div className="sm:hidden mt-10 bg-slate-50 rounded-lg rounded-b-none space-y-4 p-10">
      {products.map((item) => (
        <div key={item.id} className="flex justify-between text-lg">
          <p>{item.name}</p>
          <p>{formatCurrency(item.total)}</p>
        </div>
      ))}
    </div>

    <div className="hidden sm:block mt-10 bg-neutral-50 rounded-lg rounded-b-none space-y-4 p-10">
      <table className="w-full border-collapse">
        <thead className="hidden">
          <tr>
            <th>Product name</th>
            <th>Qty.</th>
            <th>Item price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => (
            <tr
              key={item.id}
              className="flex justify-between w-full mb-4 last:mb-0"
            >
              <td className="space-y-4 basis-[60%]">
                <p className="text-gray-600 font-thin">Product name</p>
                <p className="text-base font-semibold">{item.name}</p>
              </td>
              <td className="space-y-4 basis-[10%]">
                <p className="text-gray-600 font-thin">Qty.</p>
                <p className="text-base font-semibold">{item.quantity}</p>
              </td>
              <td className="space-y-4 basis-[15%]">
                <p className="text-gray-600 font-thin">Item price</p>
                <p className="text-base font-semibold">
                  {formatCurrency(item.unitPrice)}
                </p>
              </td>
              <td className="space-y-4 basis-[15%]">
                <p className="text-gray-600 font-thin">Total</p>
                <p className="text-base font-semibold">
                  {formatCurrency(item.lineTotal)}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
);

export default ProductList;
