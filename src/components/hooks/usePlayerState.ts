import { useCallback, useEffect, useRef, useState } from 'react';

type PlayerState = 'forward' | 'backward' | null;
type EvalState = 'notStarted' | 'started' | 'paused' | 'finished';


export const usePlayerState = () => {
    const [playerState, setPlayerState] = useState<PlayerState>(null);
    const [evalState, setEvalState] = useState<EvalState>('notStarted');
    const [speed, setSpeed] = useState(100);

    const evalStateRef = useRef(evalState);

    const speedStateRef = useRef(speed)

    const playerStateRef = useRef(playerState)

    useEffect(() => {
        playerStateRef.current = playerState
    }, [playerState])

    useEffect(() => {
        console.log('SPEED', speed);

        speedStateRef.current = speed
    }, [speed])

    useEffect(() => {
        evalStateRef.current = evalState
    }, [evalState])

    const forward = useCallback(() => {
        setPlayerState('forward')
        setEvalState('paused')
    }, [setPlayerState, setEvalState])

    const backward = useCallback(() => {
        setPlayerState('backward')
        setEvalState('paused')
    }, [setPlayerState, setEvalState])

    return {
        playerState,
        speed,
        evalState,
        setEvalState,
        setPlayerState,
        backward,
        forward,
        setSpeed,
        evalStateRef,
        playerStateRef,
        speedStateRef
    }
}