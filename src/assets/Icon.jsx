const PlusIcon = (props) => (
  <svg
    className="w-6 h-6 text-gray-800 dark:text-white"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 12h14m-7 7V5"
    />
  </svg>
);

const TrashIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-trash"
    viewBox="0 0 16 16"
    {...props}
  >
    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
  </svg>
);

const ChevronDownIcon = (props) => (
  <svg
    width="11"
    height="7"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 11 7"
    {...props}
  >
    <path
      d="M1 1l4.228 4.228L9.456 1"
      stroke="currentColor"
      strokeWidth={2}
      fill="none"
      fillRule="evenodd"
    />
  </svg>
);

const ChevronLeftIcon = (props) => (
  <svg
    width="7"
    height="10"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 7 10"
    {...props}
  >
    <path
      d="M6.342.886L2.114 5.114l4.228 4.228"
      stroke="currentColor"
      strokeWidth={2}
      fill="none"
      fillRule="evenodd"
    />
  </svg>
);

const Icon = {
  Plus: PlusIcon,
  Trash: TrashIcon,
  ChevronDown: ChevronDownIcon,
  ChevronLeft: ChevronLeftIcon,
};

export default Icon;
