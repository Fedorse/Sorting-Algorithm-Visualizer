import { useEffect, useState,useRef } from "react"

export const useEvaluationState = () => {
    const [evalState, setEvalState] = useState('notStarted')
    const [speed, setSpeed] = useState(2)

    const evalStateRef = useRef(evalState)
    const speedRef = useRef(speed)

    useEffect(()=> {
        evalStateRef.current = evalState
    }, [evalState])

    useEffect(() => {
        speedRef.current = speed
    }, [speed])

    return {
        evalState,
        speed,
        evalStateRef,
        setSpeed,
        setEvalState,
        speedRef
    }
}