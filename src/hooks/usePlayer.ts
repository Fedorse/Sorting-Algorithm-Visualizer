import { useEffect, useRef, useState } from "react";

type PlayerState = 'forward' | 'backward' | 'pause' | 'play' | null;

export const usePlayer = () => {
    const [playerState, setPlayerState] = useState<PlayerState>(null);
    const [speed, setSpeed] = useState(100);

    const playerRef = useRef({ playerState, setPlayerState, speed, setSpeed });

    useEffect(() => {
        playerRef.current = { playerState, setPlayerState, speed, setSpeed };
    }, [playerState, setPlayerState, speed, setSpeed]);

    return {
        playerState,
        setPlayerState,
        speed,
        playerRef,
        setSpeed,
    }
}