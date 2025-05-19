const Popup = ({ isOpen, onClose, children, size = "md" }) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#000005be] px-2 py-4 overflow-scroll"
    >
      <div
        className={`bg-white text-black shadow-md shadow-[#364e7e1a] rounded-xl w-full p-8 max-h-[95vh] overflow-y-auto scrollbar-hide ${
          sizeClasses[size] || sizeClasses.md
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Popup;
