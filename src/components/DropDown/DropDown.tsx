import { useCallback, useState } from 'react';
import useClickOutside from '../../actions/useClickOutside';
import { algorithms } from '../../constants';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter';
import DropDownIcon from '../icon/DropDownIcon';

import './DropDown.css';

type DropDowmProps = {
  selectAlgorithm: (select: string) => void;
  selectedAlgorithm: string;
};

const DropDown: React.FC<DropDowmProps> = ({
  selectAlgorithm,
  selectedAlgorithm,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropDown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = useCallback(
    (algorithm: string) => {
      selectAlgorithm(algorithm);
      setIsOpen(false);
    },
    [selectAlgorithm, setIsOpen],
  );

  useClickOutside({
    callback: (): void => {
      if (isOpen) setIsOpen(false);
    },
    targetClass: 'dropdown',
  });

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
