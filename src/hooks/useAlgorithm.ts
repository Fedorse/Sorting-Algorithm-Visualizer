import { useCallback, useState } from 'react';
import { generateRandomArray } from '../utils/generateRandomArray';
import { algorithms } from '../algorithms';

type AlgorithmState = 'notStarted' | 'started' | 'finished';

export const useAlgorithm = ({ history, player }) => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('quick');
  const [algorithmState, setAlgorithmState] =
    useState<AlgorithmState>('notStarted');
  const [array, setArray] = useState(generateRandomArray(10, 150, 650));
  const [tracking, setTracking] = useState({
    activeIndex: null,
    compareIndex: null,
    pivotIndex: null,
  });

  const resetAlgorithm = useCallback(() => {
    setArray(generateRandomArray(10, 150, 650));
    setAlgorithmState('notStarted');
    setTracking({
      activeIndex: null,
      compareIndex: null,
      pivotIndex: null,
    });
  }, [setArray, setAlgorithmState, setTracking]);

  const resetAll = useCallback(() => {
    resetAlgorithm();
    history.resetHistory();
    player.setPlayerState(null);
  }, [resetAlgorithm, history, player]);

  const updateArray = useCallback(
    (newArray) => {
      setArray([...newArray]);
      history.updateHistory({ array: [...newArray], tracking });
    },
    [setArray, history, tracking],
  );

  const updateTracking = useCallback(
    (newTracking) => {
      setTracking((current) => {
        const nextTracking = { ...current, ...newTracking };
        history.updateHistory({ array: [...array], tracking: nextTracking });
        return nextTracking;
      });
    },
    [setTracking, history, array, tracking],
  );

  const selectAlgorithm = useCallback(
    (name) => {
      resetAll();
      setSelectedAlgorithm(name);
    },
    [setSelectedAlgorithm, resetAll],
  );

  const runAlgorithm = useCallback(async () => {
    const { playerRef, setPlayerState } = player;
    const { historyRef } = history;

    setPlayerState('play');
    setAlgorithmState('started');
    const algorithm = algorithms[selectedAlgorithm];

    await algorithm({
      array,
      updateArray,
      updateTracking,
      history: historyRef,
      player: playerRef,
    });

    setAlgorithmState('finished');
  }, [
    selectedAlgorithm,
    array,
    history,
    player,
    updateArray,
    setAlgorithmState,
    updateTracking,
  ]);

  const getCurrentStep = useCallback(() => {
    const { getCurrentHistoryItem } = history;
    const { playerState } = player;

    if (!playerState || playerState === 'play') {
      return { array, tracking };
    } else {
      return getCurrentHistoryItem();
    }
  }, [array, tracking, history, player]);

  return {
    array,
    selectedAlgorithm,
    algorithmState,
    selectAlgorithm,
    resetAlgorithm,
    resetAll,
    runAlgorithm,
    getCurrentStep,
  };
};
