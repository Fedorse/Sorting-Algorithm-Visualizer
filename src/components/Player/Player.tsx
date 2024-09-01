import { useCallback, useRef, useState } from 'react';
import ResetIcon from '../icon/ResetIcon';
import NextStepIcon from '../icon/NextStepIcon';
import PreviousStepIcon from '../icon/PreviousStepIcon';
import PlayIcon from '../icon/PlayIcon';
import InputRange from '../InputRange/InputRange';
import Button from '../Button/Button';
import PauseIcon from '../icon/PauseIcon';
import DropDown from '../DropDown/DropDown';
import DropDownSpeed from '../DropDownSpeed/DropDownSpeed';
import type { AlgorithmState } from '../../hooks';
import { PlayerState } from '../../hooks';
import { AlgorithmKeys } from '../../algorithms';

import './Player.css';

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
  const [arrayLength, setArrayLength] = useState(30);
  const intervalRef = useRef<number | null>(null);

  const speedOptions = [10, 20, 30, 40, 50];

  const handleArrayLengthChange = (newLength: number) => {
    setArrayLength(newLength);
    resetAlgorithm(newLength);
  };

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
      return <ResetIcon />;
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
      <div className="player-container">
        <div className="controls">
          <div className="algorithSelector">
            <DropDown
              selectAlgorithm={selectAlgorithm}
              selectedAlgorithm={selectedAlgorithm}
            />
          </div>

          <div className="step-buttons">
            <DropDownSpeed speed={speed} setSpeed={setSpeed} />
            <Button
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
            <Button onClick={handlePlay}>{getButtonIcon()}</Button>

            <Button
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
            <Button onClick={() => resetAlgorithm(arrayLength)}>
              <ResetIcon />
            </Button>
          </div>
        </div>
        <div className="controls-speed">
          <div>
            <InputRange
              arrayLength={arrayLength}
              handleArrayLengthChange={handleArrayLengthChange}
            />
            <div className="speed-scale">
              {speedOptions.map((option) => (
                <span key={option}>{option} el</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Player;
