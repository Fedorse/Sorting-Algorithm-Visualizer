import './DropDown.css';
import { useState } from 'react';
import useClickOutside from '../hooks/useClickOutside';
import DropDownIcon from '../icon/DropDownIcon';
import { algorithms } from '../../constants';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter';

const DropDown = ({ onSelect, selectedAlgorithm }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (algorithm) => {
    onSelect(algorithm);
    setIsOpen(false);
  };
  useClickOutside(() => {
    if (isOpen) setIsOpen(false);
  }, 'dropdown');

  return (
    <div className={`dropdown ${isOpen ? 'open' : ''}`}>
      <span className="dropdown-span" onClick={toggleDropDown}>
        <DropDownIcon />
      </span>
      <ul className="dropdown-content">
        {algorithms.map((algorithm, index) => (
          <li
            key={index}
            onClick={() => handleSelect(algorithm)}
            className={algorithm === selectedAlgorithm ? 'selected' : ''}
          >
            {capitalizeFirstLetter(algorithm)} Sort
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropDown;
