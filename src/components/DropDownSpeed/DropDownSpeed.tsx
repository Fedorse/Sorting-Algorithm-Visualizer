import { useState } from 'react';
import useClickOutside from '../../actions/useClickOutside';

import classes from './DropDownSpeed.module.css';

type DropDowmProps = {
  setSpeed: (speed: number) => void;
  speed: number;
};

const speedList = [20, 15, 10, 5];

const DropDownSpeed: React.FC<DropDowmProps> = ({ speed, setSpeed }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropDown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (selectedSpeed: number) => {
    setSpeed(selectedSpeed);
    setIsOpen(false);
  };

  useClickOutside({
    callback: (): void => {
      if (isOpen) setIsOpen(false);
    },
    targetClass: classes.dropdown,
  });

  return (
    <div className={`${classes.dropdown} ${isOpen ? classes.open : ''}`}>
      <div className={classes.dropdownSpan} onClick={toggleDropDown}>
        {speed / 10}x
      </div>

      <ul className={classes.dropdownContent}>
        {speedList.map((s, index) => (
          <li
            key={index}
            onClick={() => handleSelect(s)}
            className={s === speed ? classes.selected : ''}
          >
            {s / 10}x
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropDownSpeed;
