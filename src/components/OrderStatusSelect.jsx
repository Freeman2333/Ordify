import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

import Dropdown from "./ui/Dropdown";

const OrderStatusSelect = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialStatus = searchParams.get("status") || "";
  const [filterValue, setFilterValue] = useState(initialStatus);

  const options = ["approved", "pending", "draft"];

  useEffect(() => {
    if (filterValue) {
      searchParams.set("status", filterValue);
    } else {
      searchParams.delete("status");
    }
    setSearchParams(searchParams);
  }, [filterValue, searchParams, setSearchParams]);

  return (
    <Dropdown
      label="Filter by status"
      options={options}
      selected={filterValue}
      onChange={setFilterValue}
    />
  );
};

export default OrderStatusSelect;
