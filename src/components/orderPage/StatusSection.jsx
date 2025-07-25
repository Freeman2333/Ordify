import Button from "../ui/Button";
import Badge from "../ui/Badge";
import { useUpdateOrderStatusMutation } from "../../redux/services/mainApi";
import { STATUSES } from "../../constants";

const StatusSection = ({
  orderStatus,
  orderId,
  onDeleteClick,
  onEditClick,
}) => {
  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const handleStatusUpdate = async (newStatus) => {
    try {
      await updateOrderStatus({ id: orderId, status: newStatus }).unwrap();
    } catch (error) {
      alert("Failed to update order status:", error);
    }
  };
  return (
    <div className="mt-8 rounded-lg w-full flex items-center justify-between px-6 py-6 bg-white">
      <div className="flex space-x-2 justify-between md:justify-start md:w-auto w-full items-center">
        <p className="text-gray-600">Status</p>
        <Badge type={orderStatus} />
      </div>
      <div className="md:block hidden">
        <Button onClick={onEditClick}>Edit</Button>
        <Button variant="danger" className="ml-3" onClick={onDeleteClick}>
          Delete
        </Button>
        {orderStatus === STATUSES.PENDING && (
          <Button
            variant="primary"
            className="ml-3"
            onClick={() => handleStatusUpdate(STATUSES.APPROVED)}
          >
            Approve
          </Button>
        )}
        {orderStatus === STATUSES.DRAFT && (
          <Button
            variant="primary"
            className="ml-3"
            onClick={() => handleStatusUpdate(STATUSES.PENDING)}
          >
            Suspend
          </Button>
        )}
      </div>
    </div>
  );
};

export default StatusSection;
