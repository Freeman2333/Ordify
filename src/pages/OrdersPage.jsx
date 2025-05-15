import { useGetOrdersQuery } from "../redux/services/mainApi";

const OrderPage = () => {
  const { data } = useGetOrdersQuery();
  console.log({ data });

  return <div>OrderPage</div>;
};

export default OrderPage;
