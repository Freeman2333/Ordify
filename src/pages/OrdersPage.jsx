import { useState } from "react";
import { useSearchParams } from "react-router";

import OrderCard from "../components/OrderCard";
import OrderStatusSelect from "../components/OrderStatusSelect";
import { useGetOrdersQuery } from "../redux/services/mainApi";
import Button from "../components/ui/Button";
import plusIcon from "../assets/plus.png";
import OrderModal from "../components/OrderModal";

const OrdersPage = () => {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status") || "";

  const { data: orders, isLoading, isError } = useGetOrdersQuery({ status });

  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  if (isLoading || !orders) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Error occured
      </div>
    );
  }

  return (
    <div className="min-h-screen p-10">
      <div className="max-w-3xl flex flex-col mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="lg:text-4xl md:text-2xl  text-xl  tracking-wide font-semibold">
              Orders
            </h1>
            <p className="text-gray-500 font-light">
              There are {orders.length} orders.
            </p>
          </div>
          <div className="ml-auto mx-4">
            <OrderStatusSelect />
          </div>
          <Button
            icon={plusIcon}
            variant="primary"
            className="px-2"
            onClick={() => setIsOrderModalOpen(true)}
          >
            New Order
          </Button>
        </div>

        {/* Orders Cards */}
        <div className="mt-10 space-y-4">
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              id={order.id}
              orderDate={order.orderDate}
              status={order.status}
              total={order.total}
              clientName={order.clientName}
            />
          ))}
        </div>

        {/* Order Popup */}
        {isOrderModalOpen && (
          <OrderModal
            isOpen={isOrderModalOpen}
            onClose={() => setIsOrderModalOpen(false)}
            type="create"
          />
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
