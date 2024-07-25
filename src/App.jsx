
import { useEffect, useRef, useState } from "react"
import { generateRandomArray } from "./utils/generateRandomArray"
import { selectionSort } from "./components/algorithms/selectionSort"
import { bubbleSort } from './components/algorithms/bubbleSort'
import { quickSort } from "./components/algorithms/quickSort"
import Button from "./components/Button/Button"
import Array from "./components/Array/Array"
import Select from "./components/Select/Select"
import { insertionSort } from "./components/algorithms/insertionSort"


const App = () => {
  const [array, setArray] = useState([])
  const [sorting, setSorting] = useState(false)
  const [activeIndex, setActiveIndex] = useState(null)
  const [compareIndex, setCompareIndex] = useState(null)
  const [pivotIndex, setPivotIndex] = useState(null)
  const [algorithm, setAlgorithm] = useState('selection')

  const cancelSort = useRef(false)


  useEffect(()=>{
    setArray(generateRandomArray(10, 100, 700))
  },[])


  const resetArray = () => {
    setArray(generateRandomArray(10, 100, 700));
    setActiveIndex(null);
    setCompareIndex(null)
    setPivotIndex(null)
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
        if(algorithm === 'selection'){
          await selectionSort(array, setArray, setActiveIndex,setCompareIndex,cancelSort)
        } else if (algorithm === 'bubble') {
          await bubbleSort(array,setArray,setActiveIndex, setCompareIndex, cancelSort)
        } else if (algorithm === 'quick') {
          await quickSort(array, setActiveIndex, setArray , setPivotIndex, setCompareIndex, cancelSort);
      } else if(algorithm ==='insertion'){
          await insertionSort(array,setArray,setActiveIndex,setCompareIndex, cancelSort)
        }
        setSorting(false)
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
  


  return (
  <section>
    <Select selectedAlgorithm={algorithm} onChange={handleAlgorithmChange}/>
    <Button onClick={updateArray}>
    Update array
    </Button>
    <Button onClick={handleSort}>
    Sort array
    </Button>
    <Array array={array} activeIndex={activeIndex} barWidth={barWidth} compareIndex={compareIndex} pivotIndex={pivotIndex}/>
  </section>
  )
}

export default App