const Button = ({ children, onClick, variant = "default", className = "" }) => {
  const baseClasses =
    "text-center hover:opacity-80 p-3 px-7 rounded-full transition-all cursor-pointer";
  const variants = {
    default: "text-[#7e88c3] bg-slate-100",
    danger: "text-white bg-red-500",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
