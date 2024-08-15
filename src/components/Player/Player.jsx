import './Player.css';
import { PreviousStepIcon } from '../icon/PreviousStepIcon';
import { NextStepIcon } from '../icon/NextStepIcon';
import { ResetIcon } from '../icon/ResetIcon';
import DropDown from '../DropDown/DropDown';
import Button from '../Button/Button';
import { useRef } from 'react';
import InputRange from '../InputRange/InputRange';
import { speedOptions } from '../../constants';

const Player = ({
  selectAlgorithm,
  goToNextStep,
  getButtonText,
  goToPreviousStep,
  resetAlgorithm,
  setSpeed,
  speed,
  handleAlgorithmRun,
  selectedAlgorithm,
  evalState,
  currentTrack,
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
            disabled={
              !evalState === 'paused' ||
              evalState === 'finished' ||
              evalState === 'started' ||
              evalState === 'notStarted' ||
              currentTrack === 0
            }
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
            disabled={
              !evalState === 'paused' ||
              evalState === 'finished' ||
              evalState === 'started' ||
              evalState === 'notStarted'
            }
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
