const Button = ({
  children,
  onClick,
  variant = "default",
  className = "",
  ...rest
}) => {
  const baseClasses =
    "text-center hover:opacity-80 p-3 px-7 rounded-full transition-all cursor-pointer";
  const variants = {
    default: "text-default-text bg-slate-100",
    danger: "text-white bg-red-500",
    primary: "bg-accent text-white font-semibold",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
