import PropTypes from "prop-types";

import { baseButtonClasses, buttonVariants } from "../../utils/buttonStyles";

const Button = ({
  children,
  onClick,
  variant = "default",
  className = "",
  icon = null,
  type = "button",
  disabled,
  isLoading = false,
  ariaLabel,
  ...rest
}) => {
  const sizeClasses = icon
    ? "flex items-center justify-center p-2"
    : "px-7 p-3";

  const disabledClasses = disabled
    ? "opacity-50 cursor-not-allowed"
    : "hover:opacity-80 cursor-pointer";

  const ariaProps = !children && icon ? { "aria-label": ariaLabel } : {};

  return (
    <button
      onClick={onClick}
      className={`${baseButtonClasses} ${sizeClasses} ${disabledClasses} ${buttonVariants[variant]} ${className}`}
      type={type}
      disabled={disabled || isLoading}
      {...ariaProps}
      {...rest}
    >
      {icon && <span className={children ? "mr-2" : ""}>{icon}</span>}
      {children}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(["default", "danger", "primary"]),
};

export default Button;
