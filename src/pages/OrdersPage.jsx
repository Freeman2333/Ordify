import { useGetOrdersQuery } from "../redux/services/mainApi";

const OrderPage = () => {
  const { data } = useGetOrdersQuery();
  console.log({ data });

  return (
    <div className="text-3xl text-amber-300 font-bold underline">OrderPage</div>
  );
};

export default OrderPage;
