
import { useEffect, useState } from "react"
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


  useEffect(()=>{
    setArray(generateRandomArray(40, 100, 700))
  },[])


  const updateArray = () => {
    if (sorting) return;
    setArray(generateRandomArray(40, 100, 700));
    setActiveIndex(null);
    setCompareIndex(null)
    setPivotIndex(null)
    
  }

  const handleSort = async () => {
        setSorting(true)
        if(algorithm === 'selection'){
          await selectionSort(array, setArray, setActiveIndex,setCompareIndex)
        } else if (algorithm === 'bubble') {
          await bubbleSort(array,setArray,setActiveIndex, setCompareIndex)
        } else if (algorithm === 'quick') {
          await quickSort(array, setActiveIndex, setArray , setPivotIndex, setCompareIndex);
      } else if(algorithm ==='insertion'){
          await insertionSort(array,setArray,setActiveIndex,setCompareIndex)
        }
        setSorting(false)
  }

  const barWidth = window.screen.width / array.length;


  return (
  <section>
    <Select selectedAlgorithm={algorithm} onChange={setAlgorithm}/>
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