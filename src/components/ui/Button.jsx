const Button = ({
  children,
  onClick,
  variant = "default",
  className = "",
  icon = null,
  iconAlt = "",
  type,
  disabled,
  ...rest
}) => {
  const baseClasses = `text-center   ${
    icon ? "flex items-center justify-center p-2" : "px-7 p-3"
  } ${
    disabled
      ? "opacity-50 cursor-not-allowed"
      : "hover:opacity-80 cursor-pointer"
  } rounded-full transition-all`;

  const variants = {
    default: "text-default-text bg-slate-100",
    danger: "text-white bg-red-500",
    primary: "bg-accent text-white font-semibold",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      type={type}
      disabled={disabled}
      {...rest}
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
