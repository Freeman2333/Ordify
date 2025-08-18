import { Link } from "react-router";

import Badge from "./ui/Badge";
import { formatCurrency, formatDate } from "../utils/utils";

const OrderCard = ({ id, orderDate, status, clientName, total }) => {
  return (
    <Link
      to={`/orders/${id}`}
      aria-label={`View order #${id} placed on ${formatDate(
        orderDate
      )} by ${clientName}, total ${formatCurrency(total)}, status ${status}`}
    >
      {/* Big Screen */}
      <div className="hidden md:flex cursor-pointer duration-100 ease-in-out hover:border border-purple-500 py-4 shadow-sm px-6 bg-white rounded-lg items-center justify-between mb-3">
        <div className="flex items-center">
          <p>
            <span className="text-default-text">#</span>
            {id}
          </p>
          <p className="text-sm text-gray-600 font-light ml-6">
            {formatDate(orderDate)}
          </p>
          <p className="text-sm text-gray-600 font-light ml-10">{clientName}</p>
        </div>
        <div className="flex items-center">
          <span className="text-xl mr-8 text-black">
            {formatCurrency(total)}
          </span>
          <Badge type={status} />
        </div>
      </div>

      {/* Phone Screen */}
      <div className="md:hidden flex cursor-pointer hover:border border-purple-500 py-4 shadow-sm px-6 bg-white rounded-lg items-center justify-between mb-3">
        <div className="flex flex-col">
          <p>
            <span className="text-default-text">#</span>
            {id}
          </p>
          <p className="text-sm text-gray-600 font-light mt-3">
            {formatDate(orderDate)}
          </p>
          <span className="text-xl text-black">{formatCurrency(total)}</span>
        </div>
        <div className="flex flex-col text-right">
          <p className="text-sm mb-4 text-gray-600 font-light">{clientName}</p>
          <Badge type={status} />
        </div>
      </div>
    </Link>
  );
};

export default OrderCard;
