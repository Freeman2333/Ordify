import { useState } from "react";
import { Link, useNavigate, useParams, Navigate } from "react-router";

import leftArrow from "../assets/icon-arrow-left.svg";
import {
  useDeleteOrderMutation,
  useGetOrderQuery,
} from "../redux/services/mainApi";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import { formatDate } from "../utils/formatDate";
import DeleteModal from "../components/DeleteModal";

const OrderPage = () => {
  const params = useParams();
  const { orderId } = params;

  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { data: order, isLoading, isError } = useGetOrderQuery(orderId);
  const [triggerDeleteOrder] = useDeleteOrderMutation();

  const handleDeleteOrder = async () => {
    try {
      await triggerDeleteOrder(orderId).unwrap();
      navigate("/");
    } catch (_) {
      console.error("Something went wrong. Please, try again later");
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  if (!orderId) {
    return <Navigate to="/orders" replace />;
  }

  if (isLoading || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Error occurred
      </div>
    );
  }

  return (
    <div className="mx-auto duration-300 min-h-screen bg-[#f8f8fb] py-[34px] px-2 md:px-8 lg:px-12 max-w-3xl lg:py-[72px]">
      <Link to={`/`} className="flex items-center space-x-4 group font-thin">
        <img src={leftArrow} alt="Go back" />
        <p className="group-hover:opacity-80">Go back</p>
      </Link>

      {/* Status Section */}
      <div className="mt-8 rounded-lg w-full flex items-center justify-between px-6 py-6 bg-white">
        <div className="flex space-x-2 justify-between md:justify-start md:w-auto w-full items-center">
          <p className="text-gray-600">Status</p>
          <Badge type={order.status} />
        </div>
        <div className="md:block hidden">
          <Button>Edit</Button>
          <Button
            variant="danger"
            className="ml-3"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            Delete
          </Button>
          {order.status === "pending" && (
            <Button variant="primary" className="ml-3">
              Approve
            </Button>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="mt-4 rounded-lg w-full px-6 py-6 bg-white">
        {/* Order Info */}
        <div>
          <h1 className="font-semibold text-xl">
            <span className="text-default-text">#</span>
            {order.id}
          </h1>
          <p className="text-sm text-gray-500">{order.clientName}</p>
        </div>

        {/* Order Meta */}
        <div className="mt-10 grid grid-cols-2 w-full md:grid-cols-3">
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-gray-400 font-thin">Order Date</p>
              <p className="text-lg font-semibold">
                {formatDate(order.orderDate)}
              </p>
            </div>
          </div>

          <div>
            <p className="text-gray-400 font-thin">Bill to</p>
            <p className="text-lg font-semibold">{order.clientName}</p>
            <p className="text-gray-400 font-thin">
              {order.clientAddress.street}, {order.clientAddress.postCode}
            </p>
            <p className="text-gray-400 font-thin">
              {order.clientAddress.city}, {order.clientAddress.country}
            </p>
          </div>

          <div className="mt-8 md:mt-0">
            <p className="text-gray-400 font-thin">Sent to</p>
            <p className="text-lg font-semibold">{order.clientEmail}</p>
          </div>
        </div>

        {/* Mobile Product List */}
        <div className="sm:hidden mt-10 bg-slate-50 rounded-lg rounded-b-none space-y-4 p-10">
          {order.products.map((item, index) => (
            <div key={index} className="flex justify-between text-lg">
              <p>{item.name}</p>
              <p>${item.total}</p>
            </div>
          ))}
        </div>

        {/* Desktop Product Table */}
        <div className="hidden sm:block mt-10 bg-neutral-50 rounded-lg rounded-b-none space-y-4 p-10">
          {order.products.map((item, index) => (
            <div key={index} className="flex justify-between">
              <div className="space-y-4 basis-[60%]">
                <p className="text-gray-400 font-thin">Product name</p>
                <p className="text-base font-semibold">{item.name}</p>
              </div>
              <div className="space-y-4 basis-[10%]">
                <p className="text-gray-400 font-thin">Qty.</p>
                <p className="text-base font-semibold">{item.quantity}</p>
              </div>
              <div className="space-y-4 basis-[15%]">
                <p className="text-gray-400 font-thin">Item price</p>
                <p className="text-base font-semibold">${item.unitPrice}</p>
              </div>
              <div className="space-y-4 basis-[15%]">
                <p className="text-gray-400 font-thin">Total</p>
                <p className="text-base font-semibold">${item.lineTotal}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Total Amount */}
        <div className="p-10 font-semibold text-white rounded-lg rounded-t-none flex justify-between bg-gray-700">
          <p className="text-xl">Total Amount</p>
          <p className="text-3xl">${order.total}</p>
        </div>
      </div>

      {/* Delete Modal */}
      <DeleteModal
        orderId={order.id}
        isDeleteModalOpen={isDeleteModalOpen}
        onDeleteButtonClick={handleDeleteOrder}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
      />
    </div>
  );
};

export default OrderPage;
