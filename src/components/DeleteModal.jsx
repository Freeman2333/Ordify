import Button from "./ui/Button";
import Popup from "./ui/Popup";

const DeleteModal = ({
  orderId,
  onDeleteButtonClick,
  setIsDeleteModalOpen,
  isDeleteModalOpen,
  isDeleting,
}) => {
  return (
    <Popup
      isOpen={isDeleteModalOpen}
      onClose={() => setIsDeleteModalOpen(false)}
      labelledById="delete-title"
    >
      <header>
        <h3 className="font-bold text-red-500 text-xl" id="delete-title">
          Confirm Deletion
        </h3>
      </header>

      <section>
        <p className="text-gray-500 font-[600] tracking-wide text-xs pt-6">
          Are you sure you want to delete order {orderId}?
        </p>

        <div className="flex w-full mt-4 items-center justify-center space-x-4">
          <Button
            variant="danger"
            onClick={onDeleteButtonClick}
            className="w-full"
            disabled={isDeleting}
          >
            Delete
          </Button>
          <Button
            onClick={() => setIsDeleteModalOpen(false)}
            disabled={isDeleting}
            className="w-full"
          >
            Cancel
          </Button>
        </div>
      </section>
    </Popup>
  );
};

export default DeleteModal;
