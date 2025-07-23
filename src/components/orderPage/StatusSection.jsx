import Button from "../ui/Button";
import Badge from "../ui/Badge";

const StatusSection = ({ status, onDeleteClick }) => (
  <div className="mt-8 rounded-lg w-full flex items-center justify-between px-6 py-6 bg-white">
    <div className="flex space-x-2 justify-between md:justify-start md:w-auto w-full items-center">
      <p className="text-gray-600">Status</p>
      <Badge type={status} />
    </div>
    <div className="md:block hidden">
      <Button>Edit</Button>
      <Button variant="danger" className="ml-3" onClick={onDeleteClick}>
        Delete
      </Button>
      {status === "pending" && (
        <Button variant="primary" className="ml-3">
          Approve
        </Button>
      )}
    </div>
  </div>
);

export default StatusSection;
