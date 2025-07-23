import { formatCurrency } from "../../utils/utils";

const TotalAmount = ({ total }) => (
  <div className="p-10 font-semibold text-white rounded-lg rounded-t-none flex justify-between bg-gray-700">
    <p className="text-xl">Total Amount</p>
    <p className="text-3xl">{formatCurrency(total)}</p>
  </div>
);

export default TotalAmount;
