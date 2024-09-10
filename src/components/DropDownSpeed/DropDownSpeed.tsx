import { useState } from 'react';
import useClickOutside from '../../hooks/useClickOutside';
import { speedDisplayMap } from './index';
import classes from './DropDownSpeed.module.css';
import SpeedIcon from '../Icons/SpeedIcon';
import Button from '../Button/Button';

type DropDowmProps = {
  setSpeed: (speed: number) => void;
  speed: number;
};

const speedList = [10, 50, 100, 250];

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
    callback: () => setIsOpen(false),
    targetClass: classes.dropdown,
  });

  return (
    <div
      className={
        isOpen ? `${classes.dropdown} ${classes.open}` : classes.dropdown
      }
    >
      <Button aria-label="Speed menu" onClick={toggleDropDown}>
        <SpeedIcon speed={speed} />
        <span>Speed </span>
      </Button>
      <ul className={classes.dropdownContent}>
        {speedList.map((s) => (
          <li
            key={s}
            onClick={() => handleSelect(s)}
            className={s === speed ? classes.selected : ''}
          >
            {speedDisplayMap[s]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropDownSpeed;
