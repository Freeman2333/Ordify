import { useState, useRef } from "react";

import useClickOutside from "../../hooks/useClickOutside";
import arrowDown from "../../assets/icon-arrow-down.svg";

const Dropdown = ({
  label = "Filter by status",
  options = [],
  selected,
  onChange,
}) => {
  const dropdownRef = useRef();

  const [isOpen, setIsOpen] = useState(false);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  const handleChange = (item) => {
    const isSelected = selected === item;
    const newValue = isSelected ? "" : item;
    onChange?.(newValue);
  };

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
              onClick={() => handleChange(item)}
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
