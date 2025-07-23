import { STATUSES } from "../../constants";

const classNames = {
  [STATUSES.APPROVED]: ["text-approved-500 bg-approved-100", "bg-approved-500"],
  [STATUSES.PENDING]: ["text-pending-500 bg-pending-100", "bg-pending-500"],
  [STATUSES.DRAFT]: ["text-default-text bg-slate-100", "bg-draft-500"],
};

const Badge = ({ type }) => {
  const [textBgClass = "", dotBgClass = ""] = classNames[type] || [];

  return (
    <div
      aria-label={type}
      className={`${textBgClass} flex justify-center space-x-2 rounded-lg items-center px-4 py-2`}
    >
      <div className={`h-3 w-3 rounded-full ${dotBgClass}`} />
      <p className="capitalize">{type}</p>
    </div>
  );
};

export default Badge;
