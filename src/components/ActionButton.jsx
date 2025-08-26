import Icon from "../assets/Icon";
import Button from "./ui/Button";

const ActionButton = ({
  onClick,
  variant = "default",
  className = "",
  disabled,
  isLoading,
  children,
  ...rest
}) => (
  <Button
    variant={variant}
    className={className}
    onClick={onClick}
    disabled={isLoading || disabled}
    {...rest}
  >
    {isLoading ? <Icon.Spinner className="w-5 h-5" /> : children}
  </Button>
);

export default ActionButton;
