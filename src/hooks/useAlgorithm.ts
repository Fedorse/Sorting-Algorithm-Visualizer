import { useCallback, useState } from 'react';
import { generateRandomArray } from '../utils/generateRandomArray';
import { algorithms } from '../algorithms';
import type { AlgorithmKeys } from '../algorithms';
import type { Player } from './usePlayer';
import type { History } from './useHistory';

export type AlgorithmState = 'notStarted' | 'started' | 'finished';

export type Tracking = Partial<{
  activeIndex: number | null;
  compareIndex: number | null;
  pivotIndex: number | null;
  sortedIndices: number[];
}>;

export type AlgorithmHistory = History<{ tracking: Tracking; array: number[] }>;

export type ArrayLength = 10 | 20 | 30 | 40 | 50;

export const useAlgorithm = ({
  history,
  player,
}: {
  history: AlgorithmHistory;
  player: Player;
}) => {
  const [selectedAlgorithm, setSelectedAlgorithm] =
    useState<AlgorithmKeys>('quick');
  const [algorithmState, setAlgorithmState] =
    useState<AlgorithmState>('notStarted');
  const [arrayLength, setArrayLength] = useState<ArrayLength>(30);
  const [array, setArray] = useState(
    generateRandomArray(arrayLength, 150, 650),
  );

  const [tracking, setTracking] = useState<Tracking>({
    activeIndex: null,
    compareIndex: null,
    pivotIndex: null,
    sortedIndices: [],
  });

  const resetAndInitAlgorithm = useCallback(
    (newLength: ArrayLength = arrayLength) => {
      setArrayLength(newLength);
      setArray(generateRandomArray(newLength, 150, 650));
      setAlgorithmState('notStarted');
      setTracking({
        activeIndex: null,
        compareIndex: null,
        pivotIndex: null,
        sortedIndices: [],
      });
    },
    [arrayLength, setArray, setAlgorithmState, setTracking],
  );

  const resetAll = useCallback(
    (newLength: ArrayLength = arrayLength) => {
      resetAndInitAlgorithm(newLength);
      history.resetHistory();
      player.setPlayerState(null);
    },
    [resetAndInitAlgorithm, history, player],
  );

  const updateArray = useCallback(
    (newArray: number[]) => {
      setArray([...newArray]);
      history.updateHistory({ array: [...newArray], tracking });
    },
    [setArray, history, tracking],
  );

  const updateTracking = useCallback(
    (newTracking: Tracking) => {
      setTracking((current) => {
        const nextSortedIndices = [
          ...(current.sortedIndices || []),
          ...(newTracking.sortedIndices || []),
        ];

        const nextTracking = {
          ...current,
          ...newTracking,
          sortedIndices: nextSortedIndices,
        };

        history.updateHistory({ array: [...array], tracking: nextTracking });

        return nextTracking;
      });
    },
    [setTracking, history, array, tracking],
  );

  const selectAlgorithm = useCallback(
    (name: AlgorithmKeys) => {
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
    arrayLength,
    setArrayLength,
    array,
    selectedAlgorithm,
    algorithmState,
    selectAlgorithm,
    resetAll,
    runAlgorithm,
    getCurrentStep,
  };
};
