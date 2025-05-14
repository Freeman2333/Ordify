import React from "react";
import { useGetOrdersQuery } from "../redux/services/mainApi";

const Orders = () => {
  const { data } = useGetOrdersQuery();
  console.log({ data });

  return <div>Orders</div>;
};

export default Orders;
