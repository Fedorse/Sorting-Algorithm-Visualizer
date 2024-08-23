import { useEffect, useRef, useState } from 'react';
import { PlayerState } from '../types';

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
  };
};
