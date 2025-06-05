import { useGetOrdersQuery } from "../redux/services/mainApi";

const OrdersPage = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error.message}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!orders?.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        No orders found
      </div>
    );
  }

  return (
    <div className="text-3xl text-amber-300 font-bold underline">OrderPage</div>
  );
};

export default OrdersPage;
