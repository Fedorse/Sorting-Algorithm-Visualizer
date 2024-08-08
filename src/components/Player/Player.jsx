import "./Player.css";
import { PreviousStepIcon } from "../icon/PreviousStepIcon";
import { NextStepIcon } from "../icon/NextStepIcon";
import { ResetIcon } from "../icon/ResetIcon";
import DropDown from "../DropDown/DropDown";
import Button from "../Button/Button";

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
}) => {
  return (
    <div className="player-container">
      <div className="controls">
        <DropDown
          onSelect={selectAlgorithm}
          selectedAlgorithm={selectedAlgorithm}
        />
        <div className="step-buttons">
          <Button onClick={goToPreviousStep}>
            <PreviousStepIcon />
          </Button>
          <Button onClick={handleAlgorithmRun}>{getButtonText()}</Button>
          <Button onClick={goToNextStep}>
            <NextStepIcon />
          </Button>
        </div>
        <Button onClick={resetAlgorithm}>
          <ResetIcon />
        </Button>
      </div>
      <div className="controls-speed">
        <div>
          <input
            style={{ width: "320px" }}
            type="range"
            id="speed"
            value={speed}
            min={0.1}
            max={100}
            step={0.1}
            onChange={(e) => setSpeed(e.target.value)}
          />
          <div className="speed-scale">
            <span>1x</span>
            <span>2x</span>
            <span>3x</span>
            <span>4x</span>
            <span>5x</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
