
import { useEffect, useRef, useState } from "react"
import { generateRandomArray } from "./utils/generateRandomArray"
import { selectionSort } from "./components/algorithms/selectionSort"
import { quickSort } from "./components/algorithms/quickSort"
import Button from "./components/Button/Button"
import Array from "./components/Array/Array"
import { bubbleSort } from './components/algorithms/bubbleSort'
import Select from "./components/Select/Select"
import { insertionSort } from "./components/algorithms/insertionSort"


const App = () => {
  const [array, setArray] = useState([])
  const [sorting, setSorting] = useState(false)
  const [sorted, setSorted] = useState(false)
  const [activeIndex, setActiveIndex] = useState(null)
  const [compareIndex, setCompareIndex] = useState(null)
  const [pivotIndex, setPivotIndex] = useState(null)
  const [algorithm, setAlgorithm] = useState('selection')
  const [size, setSize] = useState('low')
  const speed = useRef(1)
  const cancelSort = useRef(false)


  useEffect(()=>{
    setArray(generateRandomArray(10, 100, 700))
  },[])


  const resetArray = () => {
    setArray(generateRandomArray(10, 100, 700));
    setActiveIndex(null);
    setCompareIndex(null)
    setPivotIndex(null)
    setSorted(false)
    setSorting(false)
  }
  const isSorted = (arr) => {
    for(let i = 1; i < arr.length; i++){
      if (arr[i] < arr[i - 1]) {
        return false 
      }
    }
    return true
  }

  const updateArray = () => {
    if (sorting) {
      cancelSort.current = true
      setSorting(false)
    } 
    resetArray()
  }

  const handleSort = async () => {
        setSorting(true)
        cancelSort.current = false
        let sortedArray
        if(algorithm === 'selection'){
          sortedArray = await selectionSort(array, setArray, setActiveIndex,setCompareIndex,cancelSort, speed)
        } else if (algorithm === 'bubble') {
          sortedArray = await bubbleSort(array,setArray,setActiveIndex, setCompareIndex, cancelSort, speed)
        } else if (algorithm === 'quick') {
          sortedArray = await quickSort(array, setActiveIndex, setArray , setPivotIndex, setCompareIndex, cancelSort,speed);
        } else if(algorithm ==='insertion'){
          sortedArray = await insertionSort(array,setArray,setActiveIndex,setCompareIndex, cancelSort, speed)
        }
        setSorting(false)
        if(!cancelSort.current && isSorted(sortedArray)){
          setSorted(true)
        }
  }

  const handleAlgorithmChange = (newAlgorithm) => {
    if(sorting) {
      cancelSort.current = true
      setSorting(false)
      resetArray()
    }
    setAlgorithm(newAlgorithm)
  }

const barWidth = window.screen.width / array.length;
  
const handleSpeed = (event) => {
  speed.current = event.target.value
  
}
const selectedSize = (size) => {
  if(size === 'low') {
    setArray(generateRandomArray(10, 400, 600))
  } else if(size === 'medium'){
    setArray(generateRandomArray(50, 50, 600))
  } else if(size ==='large') {
    setArray(generateRandomArray(100,10,600))
  }
}
const handleSizeChange = (event)=>{
  const value = event.target.value
  setSize(value)
  selectedSize(value)
}
const stopSort = () => {
  if(sorting){
    cancelSort.current = true
  } else if (sorted){
    resetArray()
  } else {
    handleSort()
  }
}

  return (
  <section>
    <Select selectedAlgorithm={algorithm} onChange={handleAlgorithmChange}/>
    <Button onClick={updateArray}>
    Update array
    </Button>
    <Button onClick={stopSort}>
    {sorting ? 'stop' : sorted ? 'reset' : 'start'}
    </Button>
    <input type="range"  id="speed" min={0.10} max={10} step={0.10} onChange={handleSpeed}/>
    <label htmlFor="speed">Speed</label>
    <h3>Speed: {speed.current}</h3>
    {/* <button className="button" onClick={stopSort}>{textButton}</button> */}
<select  className="select"  onChange={handleSizeChange} value={size}>
  <option value="low">low size arr</option>
  <option value="medium">medium size arr</option>
  <option value="large">large size arr</option>
</select>

    <Array array={array} activeIndex={activeIndex} barWidth={barWidth} compareIndex={compareIndex} pivotIndex={pivotIndex}/>
  </section>
  )
}

export default App