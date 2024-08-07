import './Select.css'

const Select = ({selectedAlgorithm, onChange}) => {
  return (
    <select className='select'  value={selectedAlgorithm} onChange={(e) => onChange(e.target.value)}>
    <option value="selection">...</option>
    <option value="bubble">Bubble sort</option>
    <option value="quick">Quick sort</option>
    <option value="insertion">insertion sort</option>

  </select>
  )
}

export default Select