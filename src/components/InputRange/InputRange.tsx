import './InputRange.css';

type InputRangeType = {
  arrayLength: number;
  handleArrayLengthChange: (length: number) => void;
};

const InputRange: React.FC<InputRangeType> = ({
  arrayLength,
  handleArrayLengthChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLength = parseFloat(e.target.value);
    handleArrayLengthChange(newLength);
  };

  return (
    <input
      type="range"
      value={arrayLength}
      min={10}
      max={60}
      step={1}
      onChange={handleChange}
    />
  );
};

export default InputRange;
