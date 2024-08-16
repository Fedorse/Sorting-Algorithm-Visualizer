import { useRef, useState } from "react";

type PlayerState = 'forward' | 'backward' | null;
type EvalState = 'notStarted' | 'started' | 'paused' | 'finished';

export const usePlayer = () => {
    const [playerState, setPlayerState] = useState<PlayerState>(null);
    const [evalState, setEvalState] = useState<EvalState>('notStarted');
    const [speed, setSpeed] = useState(100);

    const evalStateRef = useRef(evalState);
    const updateEvalState = (newState: EvalState) => {
        setEvalState(newState);
        evalStateRef.current = newState;
    };

    const playerStateRef = useRef(playerState);
    const updatePlayerState = (newState: PlayerState) => {
        setPlayerState(newState);
        playerStateRef.current = newState;
    };

    return {
        playerState,
        speed,
        evalState,
        evalStateRef,
        playerStateRef,
        setEvalState: updateEvalState,
        setPlayerState: updatePlayerState,
        setSpeed,
    }
}