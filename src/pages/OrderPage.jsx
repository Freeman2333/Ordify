import { useParams } from "react-router";

const OrderPage = () => {
  const params = useParams();

  const { orderId } = params;

  return <div>OrderPage {orderId}</div>;
};

export default OrderPage;
