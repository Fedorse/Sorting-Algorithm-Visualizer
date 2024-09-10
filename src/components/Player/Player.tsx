import { useCallback, useRef, useState } from 'react';
import ResetIcon from '../Icons/ResetIcon';
import NextStepIcon from '../Icons/NextStepIcon';
import PreviousStepIcon from '../Icons/PreviousStepIcon';
import ResetPlayerIcon from '../Icons/ResetPlayerIcon';
import PlayIcon from '../Icons/PlayIcon';
import InputRange from '../InputRange/InputRange';
import Button from '../Button/Button';
import PauseIcon from '../Icons/PauseIcon';
import DropDown from '../DropDownAlgorithm/DropDownAlgorithm';
import DropDownSpeed from '../DropDownSpeed/DropDownSpeed';

import type { PlayerState } from '../../hooks';
import type { AlgorithmKeys } from '../../algorithms';
import type { AlgorithmState } from '../../hooks';

import classes from './Player.module.css';

type PlayerProps = {
  selectAlgorithm: (algorithm: AlgorithmKeys) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  resetAlgorithm: (arrayLength?: number) => void;
  setSpeed: (speed: number) => void;
  handlePlay: () => void;
  speed: number;
  selectedAlgorithm: AlgorithmKeys;
  algorithmState: AlgorithmState;
  playerState: PlayerState;
};

const Player: React.FC<PlayerProps> = ({
  speed,
  setSpeed,
  selectAlgorithm,
  goToNextStep,
  goToPreviousStep,
  resetAlgorithm,
  handlePlay,
  selectedAlgorithm,
  algorithmState,
  playerState,
}) => {
  const [arrayLength, setArrayLength] = useState(20);
  const [isRotating, setIsRotating] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const handleArrayLengthChange = (newLength: number) => {
    setArrayLength(newLength);
    resetAlgorithm(newLength);
  };

  const handleResetAlgorithm = useCallback(() => {
    resetAlgorithm(arrayLength);
    setIsRotating(true);
    setTimeout(() => setIsRotating(false), 500);
  }, [arrayLength, resetAlgorithm]);

  const startInterval = (action: () => void) => {
    if (intervalRef.current === null) {
      intervalRef.current = setInterval(() => {
        action();
      }, 100);
    }
  };

  const clearTimer = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = null;
  };

  const handleMouseDown = (action: () => void) => {
    action();
    startInterval(action);
  };
  const handleMouseUpOrLeave = () => {
    clearTimer();
  };

  const getButtonIcon = useCallback(() => {
    if (algorithmState === 'notStarted') {
      return <PlayIcon />;
    }
    if (algorithmState === 'finished') {
      return <ResetPlayerIcon />;
    }

    if (playerState === 'play') {
      return <PauseIcon />;
    }
    {
      return <PlayIcon />;
    }
  }, [algorithmState, playerState]);

  return (
    <section>
      <div className={classes.playerContainer}>
        <div className={classes.controls}>
          <DropDown
            selectAlgorithm={selectAlgorithm}
            selectedAlgorithm={selectedAlgorithm}
          />
          <div className={classes.controlButtons}>
            <Button
              aria-label="Previous step"
              isDisabled={algorithmState === 'notStarted'}
              onMouseDown={() => handleMouseDown(goToPreviousStep)}
              onMouseUp={handleMouseUpOrLeave}
              onMouseLeave={handleMouseUpOrLeave}
              onTouchStart={() => handleMouseDown(goToPreviousStep)}
              onTouchEnd={handleMouseUpOrLeave}
              onTouchCancel={handleMouseUpOrLeave}
            >
              <PreviousStepIcon />
            </Button>

            <Button aria-label="Play/Pause" onClick={handlePlay}>
              {getButtonIcon()}
            </Button>

            <Button
              aria-label="Next step"
              isDisabled={algorithmState === 'notStarted'}
              onMouseDown={() => handleMouseDown(goToNextStep)}
              onMouseUp={handleMouseUpOrLeave}
              onMouseLeave={handleMouseUpOrLeave}
              onTouchStart={() => handleMouseDown(goToNextStep)}
              onTouchEnd={handleMouseUpOrLeave}
              onTouchCancel={handleMouseUpOrLeave}
            >
              <NextStepIcon />
            </Button>
          </div>
          <div className={classes.speedButton}>
            <DropDownSpeed speed={speed} setSpeed={setSpeed} />
          </div>
        </div>
        <div className={classes.controlSpeed}>
          <InputRange
            arrayLength={arrayLength}
            handleArrayLengthChange={handleArrayLengthChange}
          />

          <Button aria-label="Reset" onClick={handleResetAlgorithm}>
            <ResetIcon className="reset-icon" isRotating={isRotating} />
            <span>Reset</span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Player;
