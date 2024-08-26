import './InputRange.css';

type InputRangeType = {
  speed: number;
  setSpeed: (speed: number) => void;
};

const InputRange: React.FC<InputRangeType> = ({ speed, setSpeed }) => {
  return (
    <input
      type="range"
      id="speed"
      value={speed}
      min={10}
      max={30}
      step={0.1}
      onChange={(e) => setSpeed(parseFloat(e.target.value))}
    />
  );
};

export default InputRange;
