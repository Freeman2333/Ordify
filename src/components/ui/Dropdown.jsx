import { useState, useRef } from "react";

import useClickOutside from "../../hooks/useClickOutside";
import Icon from "../../assets/Icon";

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
        <Icon.ChevronDown
          className={`ml-3 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          } w-3 h-3`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <ul
          className="w-40 absolute bg-white shadow-2xl rounded-xl mt-3 py-2 z-10"
          role="listbox"
          aria-label="Filter by status"
        >
          {options.map((item) => (
            <li
              key={item}
              onClick={() => handleChange(item)}
              className={`flex items-center px-4 py-2 cursor-pointer rounded-md ${
                selected === item ? "bg-accent text-white" : "hover:bg-gray-100"
              }`}
              role="option"
              aria-selected={selected === item}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
