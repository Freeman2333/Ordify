import { Link } from "react-router";

import Badge from "./ui/Badge";

const OrderCard = ({ id, orderDate, status, clientName, total }) => {
  return (
    <Link to={`/orders/${id}`}>
      {/* Big Screen */}
      <div className="hidden md:flex cursor-pointer duration-100 ease-in-out hover:border border-purple-500 py-4 shadow-sm px-6 bg-white rounded-lg items-center justify-between mb-3">
        <div className="flex items-center">
          <p>
            <span className="text-[#7e88c3]">#</span>
            {id}
          </p>
          <p className="text-sm text-gray-400 font-light ml-6">{orderDate}</p>
          <p className="text-sm text-gray-400 font-light ml-10">{clientName}</p>
        </div>
        <div className="flex items-center">
          <span className="text-xl mr-8 text-black">${total}</span>
          <Badge type={status} />
        </div>
      </div>

      {/* Phone Screen */}
      <div className="md:hidden flex cursor-pointer hover:border border-purple-500 py-4 shadow-sm px-6 bg-white rounded-lg items-center justify-between mb-3">
        <div className="flex flex-col">
          <p>
            <span className="text-[#7e88c3]">#</span>
            {id}
          </p>
          <p className="text-sm text-gray-400 font-light mt-3">{orderDate}</p>
          <span className="text-xl text-black">${total}</span>
        </div>
        <div className="flex flex-col text-right">
          <p className="text-sm mb-4 text-gray-400 font-light">{clientName}</p>
          <Badge type={status} />
        </div>
      </div>
    </Link>
  );
};

export default OrderCard;
