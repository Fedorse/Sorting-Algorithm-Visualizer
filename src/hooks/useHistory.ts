import { useCallback, useEffect, useRef, useState } from 'react';

export const useHistory = <T>() => {
  const [history, setHistory] = useState<T[]>([]);
  const [currentTrack, setCurrentTrack] = useState(0);
  const incrementTrack = useCallback(() => {
    setCurrentTrack((prevTrack) => Math.min(history.length - 1, prevTrack + 1));
  }, [setCurrentTrack, history]);

  const decrementTrack = useCallback(() => {
    setCurrentTrack((prevTrack) => Math.max(0, prevTrack - 1));
  }, [setCurrentTrack]);

  const isHistoryEnd = useCallback(() => {
    return currentTrack === history.length - 1;
  }, [currentTrack, history]);

  const updateHistory = useCallback(
    (newState: T) => {
      setHistory((prevHistory) => {
        setCurrentTrack(prevHistory.length);
        return [...prevHistory, newState];
      });
    },
    [setHistory, incrementTrack],
  );

  const resetHistory = useCallback(() => {
    setHistory([]);
    setCurrentTrack(0);
  }, [setHistory, setCurrentTrack]);

  const getCurrentHistoryItem = useCallback(() => {
    return history[currentTrack];
  }, [history, currentTrack]);

  const historyRef = useRef({
    updateHistory,
    incrementTrack,
    decrementTrack,
    isHistoryEnd,
  });

  useEffect(() => {
    historyRef.current = {
      updateHistory,
      incrementTrack,
      decrementTrack,
      isHistoryEnd,
    };
  }, [updateHistory, incrementTrack, decrementTrack, isHistoryEnd]);

  return {
    history,
    historyRef,
    currentTrack,
    getCurrentHistoryItem,
    updateHistory,
    resetHistory,
    incrementTrack,
    decrementTrack,
  };
};

export type History<T> = ReturnType<typeof useHistory<T>>;
