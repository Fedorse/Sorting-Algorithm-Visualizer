
import { useEffect, useRef, useState } from "react"
import { selectionSort } from "./components/algorithms/selectionSort"
import { quickSort } from "./components/algorithms/quickSort"
import Button from "./components/Button/Button"
import Array from "./components/Array/Array"
import { bubbleSort } from './components/algorithms/bubbleSort'
import Select from "./components/Select/Select"
import { insertionSort } from "./components/algorithms/insertionSort"
import { useAlgorithmState } from "./components/hooks/useAlgorithmState"
import { useEvaluationState } from "./components/hooks/useEvaluationState"

// type AlgState = 'started' | 'notStarted' | 'paused' | 'finished'

const App = () => {
    const {
        array,
        selectedAlgorithm,
        activeIndex,
        compareIndex,
        pivotIndex,
        resetArray,
        resetTracking,
        setArray,
        setSelectedAlgorithm,
        setActiveIndex,
        setCompareIndex,
        setPivotIndex
    } = useAlgorithmState()

    const {
        evalState,
        speed,
        evalStateRef,
        setSpeed,
        setEvalState,
        speedRef
    } = useEvaluationState()

    const [shouldSort, setShouldSort] = useState(false);


    useEffect(() => {
        if (shouldSort) {
            setShouldSort(false);
            handleSort();
        }
    }, [shouldSort]);

    const handleAlgorithmRun = async () => {
        if(evalState === 'notStarted'){
            await handleSort()
        } else if (evalState === 'started'){
            setEvalState('paused')
        } else if(evalState === 'paused') {
            setEvalState('started')
        } else if(evalState === 'finished') {
            resetArray();
            setShouldSort(true)
        }
    }

    const handleSort = async () => {
       try {
        setEvalState('started')

        if(selectedAlgorithm === 'selection'){
            await selectionSort(array, setArray, setActiveIndex,setCompareIndex, evalStateRef, speedRef)
         } else if (selectedAlgorithm === 'bubble') {
            await bubbleSort(array,setArray,setActiveIndex, setCompareIndex, evalStateRef, speedRef)
         } else if (selectedAlgorithm === 'quick') {
            await quickSort(array, setActiveIndex, setArray , setPivotIndex, setCompareIndex, evalStateRef, speedRef);
         } else if(selectedAlgorithm ==='insertion'){
            await insertionSort(array,setArray,setActiveIndex,setCompareIndex, evalStateRef, speedRef)
         
   }
        setEvalState('finished')
        resetTracking()
       } catch (e) {
        if (e.message === 'cancelSort') {
            console.log('Sort cancelled');
            resetTracking();
        }
       }
}

const getButtonText = () => {
    if(evalState === 'notStarted') {
        return 'start'
    } else if (evalState === 'started'){
        return 'paused'
    } else if (evalState === 'paused'){
        return 'resume'
    } else {
       return 'reset and resume'
    }
}

const selectAlgorithm = (newAlgorithm) => {
    resetTracking()
    setEvalState('notStarted')
    setSelectedAlgorithm(newAlgorithm)
}

const resetAlgorithm = () => {
    setEvalState('notStarted')
    resetTracking()
    resetArray()

}

const barWidth = window.screen.width / array.length;

  return (
  <section>
    <Select selectedAlgorithm={selectedAlgorithm} onChange={selectAlgorithm}/>
    <Button onClick={resetAlgorithm}>
    Update array
    </Button>
    <Button onClick={handleAlgorithmRun}>
    {getButtonText()}
    </Button>
    <input type="range"  id="speed" value={speed} min={0.10} max={10} step={0.10} onChange={(e) => setSpeed(e.target.value)}/>
    <label htmlFor="speed">Speed</label>
    <h3>Speed: {speed}</h3>
    <Array  array={array} activeIndex={activeIndex} barWidth={barWidth} compareIndex={compareIndex} pivotIndex={pivotIndex}/>
  </section>
  )
}

export default App