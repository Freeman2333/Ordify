import OrderCard from "../components/OrderCard";
import { useGetOrdersQuery } from "../redux/services/mainApi";

const OrdersPage = () => {
  const { data: orders, isLoading, isError } = useGetOrdersQuery();

  if (isLoading || !orders) {
    return (
      <div className="bg-[#f8f8fb] min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-[#f8f8fb] min-h-screen flex items-center justify-center">
        Error occured
      </div>
    );
  }

  return (
    <div className="bg-[#f8f8fb] min-h-screen p-10">
      <div className="max-w-3xl flex flex-col mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="lg:text-4xl md:text-2xl  text-xl  dark:text-white tracking-wide font-semibold">
              Orders
            </h1>
            <p className="text-gray-500 font-light">
              There are {orders.length} orders.
            </p>
          </div>
        </div>

        {/* Orders Cards */}
        <div className="mt-10 space-y-4">
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              id={order.id}
              orderDate={order.orderDate}
              billTo={order.billTo}
              status={order.status}
              total={order.total}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
