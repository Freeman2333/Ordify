const Popup = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#000005be] px-2 py-4 overflow-scroll"
    >
      <div className="bg-white text-black shadow-md shadow-[#364e7e1a] rounded-xl max-w-md w-full p-8 max-h-[95vh] overflow-y-auto scrollbar-hide">
        {children}
      </div>
    </div>
  );
};

export default Popup;
