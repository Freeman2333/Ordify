import { FocusTrap } from "focus-trap-react";

const Popup = ({ isOpen, onClose, children, labelledById }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Escape") onClose();
  };

  if (!isOpen) return null;

  return (
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
          className="bg-white text-black shadow-md 
       rounded-xl max-w-md w-full p-8 max-h-[95vh] overflow-y-auto scrollbar-hide"
        >
          {children}
        </div>
      </div>
    </FocusTrap>
  );
};

export default Popup;
