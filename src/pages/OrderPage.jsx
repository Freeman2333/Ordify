import { Navigate, useParams } from "react-router";

const OrderPage = () => {
  const { orderId } = useParams();

  if (!orderId) {
    return <Navigate to="/orders" replace />;
  }

  return <h1>OrderPage {orderId}</h1>;
};

export default OrderPage;
