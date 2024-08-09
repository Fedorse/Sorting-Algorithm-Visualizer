import "./Player.css";
import { PreviousStepIcon } from "../icon/PreviousStepIcon";
import { NextStepIcon } from "../icon/NextStepIcon";
import { ResetIcon } from "../icon/ResetIcon";
import DropDown from "../DropDown/DropDown";
import Button from "../Button/Button";
import { useRef } from "react";

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

  const intervalRef = useRef(null)

  const startInterval = (action) => {
    if(intervalRef.current === null){
      intervalRef.current = setInterval(()=>{
          action()
      },100)
    }
  }

  const clearTimer = () => {
    if(intervalRef.current !== null){
      clearInterval(intervalRef.current)
    }
    intervalRef.current = null
  }

  const handleMouseDown = (action) =>{
    action()
    startInterval(action)
  } 
  const handleMouseUpOrLeave = () =>{
    clearTimer()
  }

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
            onTouchStart={()=> handleMouseDown(goToPreviousStep)}
            onTouchEnd={handleMouseUpOrLeave}
            onTouchCancel = {handleMouseUpOrLeave}
            
            >
            <PreviousStepIcon />
          </Button>
          <Button onClick={handleAlgorithmRun}>{getButtonText()}</Button>
          <Button 
                    onMouseDown={()=>handleMouseDown(goToNextStep)}
                    onMouseUp = {handleMouseUpOrLeave}
                    onMouseLeave = {handleMouseUpOrLeave}
                    onTouchStart={()=> handleMouseDown(goToNextStep)}
                    onTouchEnd={handleMouseUpOrLeave}
                    onTouchCancel = {handleMouseUpOrLeave}
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
          <input
            style={{ width: "320px", opacity: '70%' }}
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
