import { useEffect, useState,useRef } from "react"

export const useEvaluationState = () => {
    const [evalState, setEvalState] = useState('notStarted')
    const [speed, setSpeed] = useState(100)
    const [history, setHistory] = useState([])
    const [currentStep, setCurrentStep] = useState(0)

    const evalStateRef = useRef(evalState)
    const speedRef = useRef(speed)

    useEffect(()=> {
        evalStateRef.current = evalState
    }, [evalState])

    useEffect(() => {
        speedRef.current = speed
    }, [speed])

    const updateHistory = (newArray)=> {
        setHistory((prevHistory) => [...prevHistory, newArray])
        setCurrentStep((prevStep)=> prevStep + 1)
    }
    const goToPreviousStep = () =>{
        setCurrentStep((prevStep)=> Math.max(prevStep - 1, 0))
    }
    const goToNextStep = () =>{
        setCurrentStep((prevStep)=> Math.min(prevStep + 1, history.length -1))
    }



    return {
        evalState,
        speed,
        evalStateRef,
        setSpeed,
        setEvalState,
        speedRef,
        history,
        currentStep,
        updateHistory,
        goToPreviousStep,
        goToNextStep
    }
}