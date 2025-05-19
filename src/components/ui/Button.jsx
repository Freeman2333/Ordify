const Button = ({
  children,
  onClick,
  variant = "default",
  className = "",
  icon = null,
  iconAlt = "",
  type,
}) => {
  const baseClasses = `text-center hover:opacity-80  ${
    icon ? "flex items-center justify-center p-2" : "px-7 p-3"
  } rounded-full transition-all cursor-pointer`;
  const variants = {
    default: "text-[#7e88c3] bg-slate-100",
    danger: "text-white bg-red-500",
    primary: "bg-[#7c5dfa] text-white font-semibold",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      type={type}
    >
      {icon && (
        <span className="mr-2">
          <img src={icon} alt={iconAlt} />
        </span>
      )}
      {children}
    </button>
  );
};

export default Button;
