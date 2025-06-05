import { useParams } from "react-router";

const OrderPage = () => {
  const { orderId } = useParams();

  return <div>OrderPage {orderId}</div>;
};

export default OrderPage;
