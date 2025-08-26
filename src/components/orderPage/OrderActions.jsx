import { toast } from "react-toastify";

import Badge from "../ui/Badge";
import { useUpdateOrderStatusMutation } from "../../redux/services/mainApi";
import { STATUSES } from "../../constants";
import ActionButton from "../ActionButton";

const OrderActions = ({ orderStatus, orderId, onDeleteClick, onEditClick }) => {
  const [updateOrderStatus, { isLoading: isUpdating }] =
    useUpdateOrderStatusMutation();

  const handleStatusUpdate = async (newStatus) => {
    try {
      await updateOrderStatus({ id: orderId, status: newStatus }).unwrap();
      toast.success(`Order status updated to ${newStatus}`);
    } catch (error) {
      toast.error("Failed to update order status:", error);
    }
  };

  return (
    <div className="mt-8 rounded-lg w-full flex flex-wrap items-center justify-between px-6 py-6 bg-white gap-y-2">
      <div className="flex space-x-2 justify-between md:justify-start md:w-auto w-full items-center">
        <p className="text-gray-600 hidden md:block">Status</p>
        <Badge type={orderStatus} />
      </div>

      <div className="flex items-center flex-wrap gap-y-2">
        <ActionButton onClick={onEditClick} disabled={isUpdating}>
          Edit
        </ActionButton>

        <ActionButton
          variant="danger"
          className="ml-3"
          onClick={onDeleteClick}
          disabled={isUpdating}
        >
          Delete
        </ActionButton>

        {orderStatus === STATUSES.PENDING && (
          <ActionButton
            variant="primary"
            className="ml-3"
            onClick={() => handleStatusUpdate(STATUSES.APPROVED)}
            disabled={isUpdating}
            isLoading={isUpdating}
          >
            Approve
          </ActionButton>
        )}

        {orderStatus === STATUSES.DRAFT && (
          <ActionButton
            variant="primary"
            className="ml-3"
            onClick={() => handleStatusUpdate(STATUSES.PENDING)}
            disabled={isUpdating}
            isLoading={isUpdating}
          >
            Suspend
          </ActionButton>
        )}
      </div>
    </div>
  );
};

export default OrderActions;
