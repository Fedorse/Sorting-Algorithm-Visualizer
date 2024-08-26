import { useCallback, useRef } from 'react';
import ResetIcon from '../icon/ResetIcon';
import NextStepIcon from '../icon/NextStepIcon';
import PreviousStepIcon from '../icon/PreviousStepIcon';
import PlayIcon from '../icon/PlayIcon';
import InputRange from '../InputRange/InputRange';
import Button from '../Button/Button';
import PauseIcon from '../icon/PauseIcon';
import DropDown from '../DropDown/DropDown';
import type { AlgorithmState } from '../../hooks';
import { PlayerState } from '../../hooks';
import { AlgorithmKeys } from '../../algorithms';

import './Player.css';

type PlayerProps = {
  selectAlgorithm: (algorithm: AlgorithmKeys) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  resetAlgorithm: () => void;
  setSpeed: (speed: number) => void;
  handleAlgorithmRun: () => void;
  speed: number;
  selectedAlgorithm: AlgorithmKeys;
  algorithmState: AlgorithmState;
  playerState: PlayerState;
};

const Player: React.FC<PlayerProps> = ({
  selectAlgorithm,
  goToNextStep,
  goToPreviousStep,
  resetAlgorithm,
  setSpeed,
  speed,
  handleAlgorithmRun,
  selectedAlgorithm,
  algorithmState,
  playerState,
}) => {
  const intervalRef = useRef<number | null>(null);

  const speedOptions = [1, 2, 3, 4, 5];

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
    <div className="player-container">
      <div className="controls">
        <DropDown
          selectAlgorithm={selectAlgorithm}
          selectedAlgorithm={selectedAlgorithm}
        />
        <div className="step-buttons">
          <Button
            onMouseDown={() => handleMouseDown(goToPreviousStep)}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            onTouchStart={() => handleMouseDown(goToPreviousStep)}
            onTouchEnd={handleMouseUpOrLeave}
            onTouchCancel={handleMouseUpOrLeave}
          >
            <PreviousStepIcon />
          </Button>
          <Button onClick={handleAlgorithmRun}>{getButtonIcon()}</Button>

          <Button
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
        <Button onClick={resetAlgorithm}>
          <ResetIcon />
        </Button>
      </div>
      <div className="controls-speed">
        <div>
          <InputRange speed={speed} setSpeed={setSpeed} />
          <div className="speed-scale">
            {speedOptions.map((option) => (
              <span key={option}>{option}x</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
