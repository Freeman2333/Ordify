import { useParams } from "react-router";

const OrderPage = () => {
  const { orderId } = useParams();

  return <h1>OrderPage {orderId}</h1>;
};

export default OrderPage;
