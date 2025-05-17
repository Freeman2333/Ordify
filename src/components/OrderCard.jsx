import { Link } from "react-router";

import Badge from "./ui/Badge";

const OrderCard = ({ id, orderDate, status, clientName, total }) => {
  return (
    <Link to={`/orders/${id}`}>
      {/* Big Screen  */}
      <div className="hidden md:flex cursor-pointer duration-100 ease-in-out hover:border border-purple-500 py-4 shadow-sm px-6 dark:bg-[#1E2139] bg-white rounded-lg  items-center justify-between mb-3">
        <div className=" flex items-center ">
          <h2 className=" dark:text-white ">
            <span className="text-[#7e88c3]">#</span>
            {id}
          </h2>
          <h2 className="text-sm text-gray-400 font-light ml-6">{orderDate}</h2>
          <h2 className="text-sm text-gray-400 font-light ml-10">
            {clientName}
          </h2>
        </div>
        <div className="flex items-center ">
          <h1 className=" text-xl mr-8 dark:text-white">${total}</h1>
          <Badge type={status} />
        </div>
      </div>

      {/* Phone Screen */}
      <div className=" md:hidden flex cursor-pointer hover:border border-purple-500 py-4 shadow-sm px-6 dark:bg-[#1E2139] bg-white rounded-lg  items-center justify-between mb-3">
        <div className=" flex flex-col">
          <h2 className=" dark:text-white ">
            <span className=" text-[#7e88c3]">#</span>
            {id}
          </h2>

          <h2 className="text-sm text-gray-400 font-light mt-3 ">
            {orderDate}
          </h2>
          <h1 className="text-xl dark:text-white">${total}</h1>
        </div>

        <div className="flex flex-col">
          <h2 className=" text-sm mb-4 text-gray-400 font-light text-right">
            {clientName}
          </h2>
          <Badge type={status} />
        </div>
      </div>
    </Link>
  );
};

export default OrderCard;
