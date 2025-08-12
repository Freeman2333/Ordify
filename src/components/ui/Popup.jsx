import { createPortal } from "react-dom";
import { FocusTrap } from "focus-trap-react";
import { useEffect } from "react";

const Popup = ({ isOpen, onClose, children, size = "md", labelledById }) => {
  useEffect(() => {
    document.body.classList.toggle("body-lock", isOpen);
    return () => document.body.classList.remove("body-lock");
  }, [isOpen]);

  if (!isOpen) return null;

  const handleKeyDown = (e) => {
    if (e.key === "Escape") onClose();
  };

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
  };

  const popupContent = (
    <FocusTrap>
      <div
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-popup-bg px-2 py-4 overflow-scroll"
        role="dialog"
        aria-modal="true"
        onKeyDown={handleKeyDown}
        {...(labelledById ? { "aria-labelledby": labelledById } : {})}
      >
        <div
          className={`bg-white text-black shadow-md rounded-xl w-full px-8 max-h-[95vh] overflow-y-auto scrollbar-hide ${sizeClasses[size]}`}
        >
          {children}
        </div>
      </div>
    </FocusTrap>
  );

  return createPortal(popupContent, document.getElementById("modal-root"));
};

export default Popup;
