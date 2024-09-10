import { useCallback, useState } from 'react';
import useClickOutside from '../../hooks/useClickOutside';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter';
import { algorithmNames, type AlgorithmKeys } from '../../algorithms';

import classes from './DropDownAlgorithm.module.css';
import Button from '../Button/Button';

type DropDowmProps = {
  selectAlgorithm: (select: AlgorithmKeys) => void;
  selectedAlgorithm: AlgorithmKeys;
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
    (algorithm: AlgorithmKeys) => {
      selectAlgorithm(algorithm);
      setIsOpen(false);
    },
    [selectAlgorithm, setIsOpen],
  );

  useClickOutside({
    callback: () => setIsOpen(false),
    targetClass: classes.dropdown,
  });

  return (
    <div
      className={
        isOpen ? `${classes.open} ${classes.dropdown}` : classes.dropdown
      }
    >
      <Button
        aria-label="Algorithm menu"
        className={classes.dropdownButton}
        onClick={toggleDropDown}
      >
        {capitalizeFirstLetter(selectedAlgorithm)}
      </Button>

      <ul className={classes.dropdownContent}>
        {algorithmNames.map((algorithm) => (
          <li
            key={algorithm}
            onClick={() => handleSelect(algorithm)}
            className={algorithm === selectedAlgorithm ? classes.selected : ''}
          >
            {capitalizeFirstLetter(algorithm)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropDown;
