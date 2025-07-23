import { formatDate } from "../../utils/utils";

const OrderDetails = ({
  id,
  clientName,
  orderDate,
  clientAddress,
  clientEmail,
}) => (
  <>
    <div>
      <h1 className="font-semibold text-xl">
        <span className="text-default-text">#</span>
        {id}
      </h1>
      <p className="text-sm text-gray-500">{clientName}</p>
    </div>

    <div className="mt-10 grid grid-cols-2 w-full md:grid-cols-3">
      <div className="flex flex-col justify-between">
        <div>
          <p className="text-gray-600 font-thin">Order Date</p>
          <p className="text-lg font-semibold">{formatDate(orderDate)}</p>
        </div>
      </div>

      <div>
        <p className="text-gray-600 font-thin">Bill to</p>
        <p className="text-lg font-semibold">{clientName}</p>
        <p className="text-gray-600 font-thin">
          {clientAddress.street}, {clientAddress.postCode}
        </p>
        <p className="text-gray-600 font-thin">
          {clientAddress.city}, {clientAddress.country}
        </p>
      </div>

      <div className="mt-8 md:mt-0">
        <p className="text-gray-600 font-thin">Sent to</p>
        <p className="text-lg font-semibold">{clientEmail}</p>
      </div>
    </div>
  </>
);

export default OrderDetails;
