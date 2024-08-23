import { useCallback, useRef } from 'react';

import { speedOptions } from '../../constants';

import ResetIcon from '../icon/ResetIcon';
import NextStepIcon from '../icon/NextStepIcon';
import PreviousStepIcon from '../icon/PreviousStepIcon';
import PlayIcon from '../icon/PlayIcon';

import InputRange from '../InputRange/InputRange';
import Button from '../Button/Button';
import PauseIcon from '../icon/PauseIcon';
import DropDown from '../DropDown/DropDown';

import './Player.css';

const Player = ({
  selectAlgorithm,
  goToNextStep,
  goToPreviousStep,
  resetAlgorithm,
  setSpeed,
  speed,
  handleAlgorithmRun,
  selectedAlgorithm,
  algorithmState,
  player,
}) => {
  const intervalRef = useRef(null);
  const startInterval = (action) => {
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

  const handleMouseDown = (action) => {
    action();
    startInterval(action);
  };
  const handleMouseUpOrLeave = () => {
    clearTimer();
  };

  const getButtonText = useCallback(() => {
    if (algorithmState === 'notStarted') {
      return <PlayIcon />;
    }
    if (algorithmState === 'finished') {
      return <ResetIcon />;
    }

    if (player.playerState === 'play') {
      return <PauseIcon />;
    }
    {
      return <PlayIcon />;
    }
  }, [algorithmState, player]);

  return (
    <div className="player-container">
      <div className="controls">
        <DropDown
          onSelect={selectAlgorithm}
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
          <Button onClick={handleAlgorithmRun}>{getButtonText()}</Button>

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
