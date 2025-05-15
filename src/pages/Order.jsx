import { useParams } from "react-router";

const Order = () => {
  const params = useParams();

  const { orderId } = params;

  return <div>Order {orderId}</div>;
};

export default Order;
