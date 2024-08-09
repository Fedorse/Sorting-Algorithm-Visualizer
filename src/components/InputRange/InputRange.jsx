import './InputRange.css'
const InputRange = ({speed, setSpeed}) => {
  return (
    <input
    type="range"
    id="speed"
    value={speed}
    min={0.1}
    max={100}
    step={0.1}
    onChange={(e) => setSpeed(e.target.value)}
  />
  )
}

export default InputRange