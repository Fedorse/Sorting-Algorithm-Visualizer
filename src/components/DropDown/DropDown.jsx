import { useState, useEffect } from "react";
import "./DropDown.css";
import useClickOutside from "../hooks/useClickOutside";
import DropDownIcon from "../icon/DropDownIcon";

const DropDown = ({ onSelect, selectedAlgorithm }) => {
  const [isOpen, setIsOpen] = useState(false);
  const algorithms = ["selection", "bubble", "quick", "insertion"];

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (algorithm) => {
    onSelect(algorithm);
    setIsOpen(false);
  };
  useClickOutside(() => {
    if (isOpen) setIsOpen(false);
  }, "dropdown");

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className={`dropdown ${isOpen ? "open" : ""}`}>
      <span className="dropdown-span" onClick={toggleDropDown}>
        <DropDownIcon />
      </span>
      <ul className="dropdown-content">
        {algorithms.map((algorithm, index) => (
          <li
            key={index}
            onClick={() => handleSelect(algorithm)}
            className={algorithm === selectedAlgorithm ? "selected" : ""}
          >
            {capitalizeFirstLetter(algorithm)} Sort
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropDown;
