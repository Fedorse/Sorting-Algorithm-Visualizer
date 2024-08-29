import './InputRange.css';
import type { ArrayLength } from '../../hooks';

type InputRangeType = {
  arrayLength: ArrayLength;
  updateArrayLength: (length: ArrayLength) => void;
};

const InputRange: React.FC<InputRangeType> = ({
  arrayLength,
  updateArrayLength,
}) => {
  return (
    <input
      id="length"
      type="range"
      value={arrayLength}
      min={10}
      max={50}
      step={10}
      onChange={(e) => updateArrayLength(Number(e.target.value) as ArrayLength)}
    />
  );
};

export default InputRange;
