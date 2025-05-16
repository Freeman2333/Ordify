import { useState, useRef, useEffect } from "react";

import arrowDown from "../../assets/icon-arrow-down.svg";

const Dropdown = ({
  label = "Filter by status",
  options = [],
  selected,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center cursor-pointer bg-transparent border-none p-0 focus:outline-none"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="hidden md:block font-medium">{label}</span>
        <span className="md:hidden font-medium">Filter</span>
        <img
          src={arrowDown}
          className={`ml-3 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          alt="arrow down"
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div className="w-40 absolute bg-white shadow-2xl rounded-xl mt-3 px-6 py-4 space-y-2 z-10">
          {options.map((item) => (
            <div
              key={item}
              onClick={() => onChange(selected === item ? "" : item)}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selected === item}
                readOnly
                className="accent-[#7c5dfa]"
              />
              <p>{item}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
