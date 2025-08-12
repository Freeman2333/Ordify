import { useState } from "react";
import { Link, useNavigate, useParams, Navigate } from "react-router";

import {
  useDeleteOrderMutation,
  useGetOrderQuery,
} from "../redux/services/mainApi";
import DeleteModal from "../components/DeleteModal";
import OrderModal from "../components/OrderModal";
import { centerScreen } from "../../styles/sharedClasses";
import OrderActions from "../components/orderPage/OrderActions";
import OrderDetails from "../components/orderPage/OrderDetails";
import ProductList from "../components/orderPage/ProductList";
import TotalAmount from "../components/orderPage/TotalAmount";
import { ORDER_MODAL_TYPE } from "../constants";
import Icon from "../assets/Icon";

const OrderPage = () => {
  const { orderId } = useParams();

  const navigate = useNavigate();

  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { data: order, isLoading, error } = useGetOrderQuery(orderId);
  const [triggerDeleteOrder] = useDeleteOrderMutation();

  const handleDeleteOrder = async () => {
    try {
      await triggerDeleteOrder(orderId).unwrap();
      navigate("/orders");
    } catch (err) {
      console.error(err.data?.message);
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
        <Icon.ChevronLeft />
        <p className="group-hover:opacity-80">Go back</p>
      </Link>

      <OrderActions
        orderStatus={order.status}
        orderId={order.id}
        onDeleteClick={() => setIsDeleteModalOpen(true)}
        onEditClick={() => setIsOrderModalOpen(true)}
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
      {isOrderModalOpen && (
        <OrderModal
          initialValues={{
            clientName: order?.clientName,
            clientEmail: order?.clientEmail,
            streetAddress: order?.clientAddress?.street,
            city: order?.clientAddress?.city,
            postCode: order?.clientAddress?.postCode,
            country: order?.clientAddress?.country,
            products: order?.products,
            orderDate: order?.orderDate,
          }}
          orderId={order.id}
          isOpen={isOrderModalOpen}
          onClose={() => setIsOrderModalOpen(false)}
          type={ORDER_MODAL_TYPE.EDIT}
        />
      )}

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
