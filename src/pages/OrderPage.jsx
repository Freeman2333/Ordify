import { useState } from "react";
import { Link, useNavigate, useParams, Navigate } from "react-router";

import leftArrow from "../assets/icon-arrow-left.svg";
import {
  useDeleteOrderMutation,
  useGetOrderQuery,
} from "../redux/services/mainApi";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import DeleteModal from "../components/DeleteModal";
import { centerScreen } from "../../styles/sharedClasses";
import { formatCurrency, formatDate } from "../utils/utils";

const StatusSection = ({ status, onDeleteClick }) => (
  <div className="mt-8 rounded-lg w-full flex items-center justify-between px-6 py-6 bg-white">
    <div className="flex space-x-2 justify-between md:justify-start md:w-auto w-full items-center">
      <p className="text-gray-600">Status</p>
      <Badge type={status} />
    </div>
    <div className="md:block hidden">
      <Button>Edit</Button>
      <Button variant="danger" className="ml-3" onClick={onDeleteClick}>
        Delete
      </Button>
      {status === "pending" && (
        <Button variant="primary" className="ml-3">
          Approve
        </Button>
      )}
    </div>
  </div>
);

const OrderDetails = ({
  id,
  clientName,
  orderDate,
  clientAddress,
  clientEmail,
}) => (
  <>
    <div>
      <h1 className="font-semibold text-xl">
        <span className="text-default-text">#</span>
        {id}
      </h1>
      <p className="text-sm text-gray-500">{clientName}</p>
    </div>

    <div className="mt-10 grid grid-cols-2 w-full md:grid-cols-3">
      <div className="flex flex-col justify-between">
        <div>
          <p className="text-gray-400 font-thin">Order Date</p>
          <p className="text-lg font-semibold">{formatDate(orderDate)}</p>
        </div>
      </div>

      <div>
        <p className="text-gray-400 font-thin">Bill to</p>
        <p className="text-lg font-semibold">{clientName}</p>
        <p className="text-gray-400 font-thin">
          {clientAddress.street}, {clientAddress.postCode}
        </p>
        <p className="text-gray-400 font-thin">
          {clientAddress.city}, {clientAddress.country}
        </p>
      </div>

      <div className="mt-8 md:mt-0">
        <p className="text-gray-400 font-thin">Sent to</p>
        <p className="text-lg font-semibold">{clientEmail}</p>
      </div>
    </div>
  </>
);

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
                <p className="text-gray-400 font-thin">Product name</p>
                <p className="text-base font-semibold">{item.name}</p>
              </td>
              <td className="space-y-4 basis-[10%]">
                <p className="text-gray-400 font-thin">Qty.</p>
                <p className="text-base font-semibold">{item.quantity}</p>
              </td>
              <td className="space-y-4 basis-[15%]">
                <p className="text-gray-400 font-thin">Item price</p>
                <p className="text-base font-semibold">
                  {formatCurrency(item.unitPrice)}
                </p>
              </td>
              <td className="space-y-4 basis-[15%]">
                <p className="text-gray-400 font-thin">Total</p>
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

const TotalAmount = ({ total }) => (
  <div className="p-10 font-semibold text-white rounded-lg rounded-t-none flex justify-between bg-gray-700">
    <p className="text-xl">Total Amount</p>
    <p className="text-3xl">{formatCurrency(total)}</p>
  </div>
);

const OrderPage = () => {
  const { orderId } = useParams();

  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { data: order, isLoading, error } = useGetOrderQuery(orderId);
  const [triggerDeleteOrder] = useDeleteOrderMutation();

  const handleDeleteOrder = async () => {
    try {
      await triggerDeleteOrder(orderId).unwrap();
      navigate("/orders");
    } catch (err) {
      alert(err.data?.message);
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  if (error) {
    return (
      <div className={`${centerScreen} text-red-500`}>
        {error.data?.message}
      </div>
    );
  }

  if (!orderId) {
    return <Navigate to="/orders" replace />;
  }

  if (!order) {
    return <div className={centerScreen}>No order {orderId} found</div>;
  }

  if (isLoading) {
    return <div className={centerScreen}>Loading...</div>;
  }

  return (
    <div className="py-[34px] px-2 md:px-8 lg:px-12 lg:py-[72px]">
      <Link to={`/`} className="flex items-center space-x-4 group font-thin">
        <img src={leftArrow} alt="Go back" />
        <p className="group-hover:opacity-80">Go back</p>
      </Link>

      <StatusSection
        status={order.status}
        onDeleteClick={() => setIsDeleteModalOpen(true)}
      />

      <div className="mt-4 rounded-lg w-full px-6 py-6 bg-white">
        <OrderDetails
          id={order.id}
          clientName={order.clientName}
          orderDate={order.orderDate}
          clientAddress={order.clientAddress}
          clientEmail={order.clientEmail}
        />
        <ProductList products={order.products} />
        <TotalAmount total={order.total} />
      </div>

      <DeleteModal
        orderId={order.id}
        isDeleteModalOpen={isDeleteModalOpen}
        onDeleteButtonClick={handleDeleteOrder}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        isDeleting={isLoading}
      />
    </div>
  );
};

export default OrderPage;
